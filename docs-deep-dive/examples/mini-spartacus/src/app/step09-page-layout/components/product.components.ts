/**
 * STEP 09 - Componenti CMS del prodotto
 * Ispirato a:
 *  - core-libs/storefront/cms-components/product/carousel/product-carousel/product-carousel.component.ts (ProductCarouselComponent)
 *  - core-libs/storefront/cms-components/product/product-intro/product-intro.component.ts   (ProductIntroComponent)
 *  - core-libs/storefront/cms-components/product/product-images/product-images.component.ts (ProductImagesComponent)
 *  - core-libs/storefront/cms-components/product/product-summary/product-summary.component.ts (ProductSummaryComponent,
 *    che usa l'outlet ProductDetailOutlets.PRICE = 'PDP.PRICE')
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../../step05-product-data/product.model';
import { ProductService } from '../../step06-ngrx-product/product.service';
import { UrlPipe } from '../../step07-routing/url.pipe';
import { CmsComponent } from '../../step08-cms/cms.model';
import { OutletDirective } from '../../step10-outlets/outlet.directive';
import { CmsComponentData } from '../cms-component-data';
import { CurrentProductService } from './current-product.service';

export interface CmsProductCarouselComponent extends CmsComponent {
  title?: string;
  /** Codici separati da spazio, come in OCC: "300938 1934793" */
  productCodes?: string;
}

@Component({
  selector: 'cx-product-carousel',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>{{ (title$ | async) ?? '' }}</h3>
    <ul class="carousel">
      @for (product of products$ | async; track product.code) {
        <li>
          <a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">
            <img [src]="product.images?.PRIMARY?.['product']?.url ?? ''" [alt]="product.name ?? ''" width="150" />
            <span>{{ product.name }}</span>
          </a>
          <strong>{{ product.price?.formattedValue }}</strong>
        </li>
      }
    </ul>
  `,
})
export class ProductCarouselComponent {
  private readonly productService = inject(ProductService);
  private readonly data$ = inject<CmsComponentData<CmsProductCarouselComponent>>(CmsComponentData).data$;

  readonly title$ = this.data$.pipe(map((data) => data?.title));

  readonly products$: Observable<Product[]> = this.data$.pipe(
    map((data) => (data?.productCodes ?? '').split(' ').filter(Boolean)),
    switchMap((codes) => (codes.length ? combineLatest(codes.map((code) => this.productService.get(code))) : of([]))),
    map((products) => products.filter((p): p is Product => !!p))
  );
}

@Component({
  selector: 'cx-product-intro',
  imports: [AsyncPipe, OutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <h1>{{ product.name }}</h1>
      <ng-template cxOutlet="PDP.PRICE" [cxOutletContext]="product">
        <p class="price">{{ product.price?.formattedValue }}</p>
      </ng-template>
    }
  `,
})
export class ProductIntroComponent {
  readonly product$ = inject(CurrentProductService).getProduct();
}

@Component({
  selector: 'cx-product-images',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <img [src]="product.images?.PRIMARY?.['product']?.url ?? ''" [alt]="product.name ?? ''" width="300" />
    }
  `,
})
export class ProductImagesComponent {
  readonly product$ = inject(CurrentProductService).getProduct();
}

@Component({
  selector: 'cx-product-summary',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <p>{{ product.summary }}</p>
      <p>Disponibilita': {{ product.stock?.stockLevelStatus ?? 'n.d.' }}</p>
      <div [innerHTML]="product.description"></div>
    }
  `,
})
export class ProductSummaryComponent {
  readonly product$ = inject(CurrentProductService).getProduct();
}
