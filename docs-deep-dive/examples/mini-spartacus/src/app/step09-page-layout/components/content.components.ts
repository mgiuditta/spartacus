/**
 * STEP 09 - Componenti CMS di contenuto: paragrafo e banner
 * Ispirato a:
 *  - core-libs/storefront/cms-components/content/paragraph/paragraph.component.ts (ParagraphComponent)
 *  - core-libs/storefront/cms-components/content/banner/banner.component.ts       (BannerComponent)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Config } from '../../step01-config/config';
import { CmsComponent } from '../../step08-cms/cms.model';
import { CmsComponentData } from '../cms-component-data';

export interface CmsParagraphComponent extends CmsComponent {
  content?: string;
}

export interface CmsBannerComponent extends CmsComponent {
  urlLink?: string;
  media?: { url?: string; altText?: string };
}

@Component({
  selector: 'cx-paragraph',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // innerHTML passa dal sanitizer di Angular: script e handler inline vengono rimossi.
  template: `
    @if (data$ | async; as data) {
      <div [innerHTML]="data.content"></div>
    }
  `,
})
export class ParagraphComponent {
  readonly data$ = inject<CmsComponentData<CmsParagraphComponent>>(CmsComponentData).data$;
}

@Component({
  selector: 'cx-banner',
  imports: [AsyncPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (data$ | async; as data) {
      <a [routerLink]="data.urlLink ?? '/'">
        <img [src]="mediaUrl(data.media?.url)" [alt]="data.media?.altText ?? ''" />
      </a>
    }
  `,
})
export class BannerComponent {
  private readonly config = inject(Config);
  readonly data$ = inject<CmsComponentData<CmsBannerComponent>>(CmsComponentData).data$;

  mediaUrl(url: string | undefined): string {
    if (!url) {
      return '';
    }
    const base = this.config.backend?.media?.baseUrl ?? this.config.backend?.occ?.baseUrl ?? '';
    return /^(https?:)?\/\//.test(url) ? url : base + url;
  }
}
