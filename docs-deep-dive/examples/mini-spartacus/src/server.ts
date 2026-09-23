/**
 * STEP 12 - Server Express per SSR con CommonEngine, timeout e fallback CSR.
 * Ispirato a:
 *  - projects/storefrontapp/src/server.ts (express + NgExpressEngineDecorator + static + defaultExpressErrorHandlers)
 *  - core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts (timeout -> fallbackToCsr con Cache-Control: no-store)
 *
 * Avvio dopo "ng build": node dist/mini-spartacus/server/server.mjs  (porta 4000, SSR_TIMEOUT=ms)
 */
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express, { NextFunction, Request, Response } from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TimeoutSsrEngine } from './app/step12-ssr/ssr-engine';
import bootstrap from './main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexServerHtml = join(serverDistFolder, 'index.server.html');
  // HTML per il fallback CSR: l'index del browser (senza contenuto renderizzato).
  const csrIndexPath = [join(browserDistFolder, 'index.csr.html'), join(browserDistFolder, 'index.html')].find((p) =>
    existsSync(p)
  );
  const csrIndexHtml = csrIndexPath ? readFileSync(csrIndexPath, 'utf-8') : readFileSync(indexServerHtml, 'utf-8');

  const ssrEngine = new TimeoutSsrEngine(
    new CommonEngine({ bootstrap, allowedHosts: ['localhost', '127.0.0.1'] }),
    { documentFilePath: indexServerHtml, publicPath: browserDistFolder },
    csrIndexHtml,
    {
      timeout: Number(process.env['SSR_TIMEOUT'] ?? 3000),
      cache: process.env['SSR_CACHE'] === 'true',
      concurrency: Number(process.env['SSR_CONCURRENCY'] ?? 10),
    }
  );

  // File statici (js, css, immagini): tutto cio' che ha un'estensione.
  server.get(/.*\..*/, express.static(browserDistFolder, { maxAge: '1y', index: false }));

  // Tutte le altre rotte: render Angular.
  server.get(/.*/, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { protocol, originalUrl, headers } = req;
      const result = await ssrEngine.render({
        url: `${protocol}://${headers.host}${originalUrl}`,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });
      if (result.strategy !== 'ssr' && result.strategy !== 'cache') {
        res.set('Cache-Control', 'no-store'); // la pagina CSR non deve finire in cache (CDN/proxy)
      }
      res.set('X-Render-Strategy', result.strategy);
      res.send(result.html);
    } catch (error) {
      next(error);
    }
  });

  return server;
}

if (isMainModule(import.meta.url)) {
  const port = Number(process.env['PORT'] ?? 4000);
  app().listen(port, () => {
    console.log(`Mini Spartacus SSR in ascolto su http://localhost:${port}`);
  });
}
