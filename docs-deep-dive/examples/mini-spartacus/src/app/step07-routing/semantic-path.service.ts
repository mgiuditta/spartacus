/**
 * STEP 07 - Da { cxRoute: 'product', params: prodotto } a ['/', 'product', '300938', 'photosmart']
 * Ispirato a:
 *  - core-libs/core/src/routing/configurable-routes/url-translation/semantic-path.service.ts
 *    (SemanticPathService.get/transform/generateUrlPart/findPathWithFillableParams/provideParamsValues)
 *  - core-libs/core/src/routing/configurable-routes/url-translation/url-command.ts (UrlCommand, UrlCommandRoute)
 *  - core-libs/core/src/routing/configurable-routes/url-translation/path-utils.ts (isParam, getParamName)
 */
import { inject, Injectable } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { ParamsMapping, RouteConfig } from './routing-config';

export interface UrlCommandRoute {
  cxRoute: string;
  params?: object;
}
export type UrlCommand = UrlCommandRoute | string;
export type UrlCommands = UrlCommand | UrlCommand[];

const isParam = (segment: string): boolean => segment.startsWith(':');
const getParamName = (segment: string): string => segment.slice(1);

@Injectable({ providedIn: 'root' })
export class SemanticPathService {
  private readonly routes = inject(ConfigurableRoutesService);
  readonly ROOT_URL = ['/'];

  /** Path "grezzo" della rotta (primo configurato), es. '/cart'. */
  get(routeName: string): string | undefined {
    const paths = this.routes.getRouteConfig(routeName)?.paths;
    return paths ? '/' + paths[0] : undefined;
  }

  /** Trasforma i comandi in un array utilizzabile da routerLink / router.navigate. */
  transform(commands: UrlCommands): string[] {
    const list = Array.isArray(commands) ? commands : [commands];
    const result: string[] = [];
    for (const command of list) {
      if (typeof command === 'string') {
        result.push(command);
        continue;
      }
      const part = this.generateUrlPart(command);
      if (part === null) {
        return this.ROOT_URL; // rotta sconosciuta o parametri mancanti -> home
      }
      result.push(...part);
    }
    if (typeof list[0] !== 'string') {
      result.unshift('/'); // i comandi cxRoute generano URL assoluti
    }
    return result;
  }

  private generateUrlPart(command: UrlCommandRoute): string[] | null {
    const routeConfig = this.routes.getRouteConfig(command.cxRoute);
    if (!routeConfig?.paths) {
      return null;
    }
    const params = (command.params ?? {}) as Record<string, unknown>;
    const path = this.findPathWithFillableParams(routeConfig, params);
    if (path === undefined) {
      return null;
    }
    return this.provideParamsValues(path, params, routeConfig.paramsMapping);
  }

  /** Il primo path i cui parametri sono tutti disponibili vince. */
  private findPathWithFillableParams(routeConfig: RouteConfig, params: Record<string, unknown>): string | undefined {
    return routeConfig.paths?.find((path) =>
      path
        .split('/')
        .filter(isParam)
        .every((segment) => {
          const name = getParamName(segment);
          const mapped = routeConfig.paramsMapping?.[name] ?? name;
          return params[mapped] !== undefined && params[mapped] !== null && params[mapped] !== '';
        })
    );
  }

  private provideParamsValues(path: string, params: Record<string, unknown>, mapping?: ParamsMapping): string[] {
    return path
      .split('/')
      .filter((segment) => segment !== '')
      .map((segment) => {
        if (!isParam(segment)) {
          return segment;
        }
        const name = getParamName(segment);
        return String(params[mapping?.[name] ?? name]);
      });
  }
}
