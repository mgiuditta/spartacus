/**
 * STEP 12 - Motore SSR con timeout e fallback CSR
 * Ispirato a:
 *  - core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts (OptimizedSsrEngine.renderResponse, fallbackToCsr,
 *    getTimeout, renderingCache: se il render supera il timeout si risponde con index.html "vuoto" (CSR)
 *    e il render continua in background per riempire la cache)
 *  - core-libs/setup/ssr/engine/cx-common-engine.ts (CxCommonEngine: wrapper di CommonEngine)
 *  - core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts (timeout, cache, concurrency)
 *
 * Questo file gira SOLO su Node (e' importato da src/server.ts), non dall'app Angular.
 */
import { StaticProvider } from '@angular/core';
import { CommonEngine, CommonEngineRenderOptions } from '@angular/ssr/node';

export interface SsrOptions {
  /** Millisecondi massimi di attesa del render; 0 = aspetta sempre. Spartacus: default 3000. */
  timeout: number;
  /** Se true i render riusciti vengono messi in cache e riusati alla richiesta successiva. */
  cache: boolean;
  /** Numero massimo di render contemporanei; oltre si va subito in CSR. Spartacus: default 10. */
  concurrency: number;
}

export type RenderStrategy = 'ssr' | 'cache' | 'csr-timeout' | 'csr-concurrency' | 'csr-error';

export interface RenderResult {
  html: string;
  strategy: RenderStrategy;
}

export interface RenderRequest {
  url: string;
  providers?: StaticProvider[];
}

export class TimeoutSsrEngine {
  private readonly cache = new Map<string, string>();
  private currentConcurrency = 0;

  constructor(
    private readonly engine: CommonEngine,
    private readonly baseRenderOptions: Omit<CommonEngineRenderOptions, 'url' | 'providers'>,
    /** Contenuto di index.html per il browser: l'app parte da zero lato client (CSR). */
    private readonly csrIndexHtml: string,
    private readonly options: SsrOptions
  ) {}

  async render(request: RenderRequest): Promise<RenderResult> {
    const key = request.url;

    const cached = this.cache.get(key);
    if (cached) {
      if (!this.options.cache) {
        this.cache.delete(key); // render "avanzato" da un timeout precedente: usato una volta sola
      }
      return { html: cached, strategy: 'cache' };
    }

    if (this.currentConcurrency >= this.options.concurrency) {
      return { html: this.csrIndexHtml, strategy: 'csr-concurrency' };
    }

    this.currentConcurrency++;
    const rendering = this.engine
      .render({ ...this.baseRenderOptions, url: request.url, providers: request.providers })
      .finally(() => this.currentConcurrency--);

    if (!this.options.timeout) {
      return this.finish(key, rendering);
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<'timeout'>((resolve) => {
      timer = setTimeout(() => resolve('timeout'), this.options.timeout);
    });

    try {
      const winner = await Promise.race([rendering, timeout]);
      if (winner === 'timeout') {
        // Il render NON viene interrotto: quando finisce, il risultato serve la prossima richiesta.
        rendering.then((html) => this.cache.set(key, html)).catch(() => undefined);
        return { html: this.csrIndexHtml, strategy: 'csr-timeout' };
      }
      return this.store(key, winner);
    } catch {
      return { html: this.csrIndexHtml, strategy: 'csr-error' };
    } finally {
      clearTimeout(timer);
    }
  }

  private async finish(key: string, rendering: Promise<string>): Promise<RenderResult> {
    try {
      return this.store(key, await rendering);
    } catch {
      return { html: this.csrIndexHtml, strategy: 'csr-error' };
    }
  }

  private store(key: string, html: string): RenderResult {
    if (this.options.cache) {
      this.cache.set(key, html);
    }
    return { html, strategy: 'ssr' };
  }
}
