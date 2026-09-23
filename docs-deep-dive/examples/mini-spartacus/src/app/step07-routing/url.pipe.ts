/**
 * STEP 07 - Pipe cxUrl
 * Ispirato a: core-libs/core/src/routing/configurable-routes/url-translation/url.pipe.ts (UrlPipe)
 *
 * Uso: <a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">...</a>
 */
import { inject, Pipe, PipeTransform } from '@angular/core';
import { SemanticPathService, UrlCommands } from './semantic-path.service';

@Pipe({ name: 'cxUrl' })
export class UrlPipe implements PipeTransform {
  private readonly semanticPath = inject(SemanticPathService);

  transform(commands: UrlCommands): string[] {
    return this.semanticPath.transform(commands);
  }
}
