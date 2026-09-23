/**
 * STEP 09 - Ricerca: box nell'header e lista risultati
 * Ispirato a:
 *  - core-libs/storefront/cms-components/navigation/search-box/search-box.component.ts (SearchBoxComponent.launchSearchResult)
 *  - core-libs/storefront/cms-components/product/product-list/container/product-list.component.ts (lista risultati)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { ProductSearchPage } from '../../step05-product-data/product.model';
import { ProductSearchService } from '../../step05-product-data/product-search.service';
import { SemanticPathService } from '../../step07-routing/semantic-path.service';
import { UrlPipe } from '../../step07-routing/url.pipe';

@Component({
  selector: 'cx-searchbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form role="search" (submit)="search($event, box.value)">
      <label>
        <span class="visually-hidden">Cerca</span>
        <input #box type="search" name="q" placeholder="Cerca prodotti" />
      </label>
      <button type="submit">Cerca</button>
    </form>
  `,
})
export class SearchBoxComponent {
  private readonly router = inject(Router);
  private readonly semanticPath = inject(SemanticPathService);

  search(event: Event, query: string): void {
    event.preventDefault();
    if (query.trim()) {
      void this.router.navigate(this.semanticPath.transform({ cxRoute: 'search', params: { query: query.trim() } }));
    }
  }
}

@Component({
  selector: 'cx-search-results',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (result$ | async; as result) {
      <h2>{{ result.totalResults }} risultati per "{{ result.freeTextSearch }}"</h2>
      <ul>
        @for (product of result.products; track product.code) {
          <li>
            <a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">{{ product.name }}</a>
            - {{ product.price?.formattedValue }}
          </li>
        }
      </ul>
    }
  `,
})
export class SearchResultsComponent {
  private readonly searchService = inject(ProductSearchService);
  private readonly router = inject(Router);

  /**
   * Nota: i componenti CMS sono creati con un injector figlio dell'injector "di ambiente",
   * NON dentro il RouterOutlet: ActivatedRoute qui sarebbe la rotta radice. Leggiamo quindi
   * il parametro :query dalla foglia dello snapshot del router.
   */
  readonly result$: Observable<ProductSearchPage | undefined> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(undefined),
    map(() => {
      let leaf = this.router.routerState.snapshot.root;
      while (leaf.firstChild) {
        leaf = leaf.firstChild;
      }
      return (leaf.params['query'] as string | undefined) ?? '';
    }),
    distinctUntilChanged(),
    switchMap((query) => this.searchService.search(query).pipe(catchError(() => of(undefined))))
  );
}
