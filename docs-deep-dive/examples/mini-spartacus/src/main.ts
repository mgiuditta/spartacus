/**
 * Avvio nel browser.
 * Ispirato a: projects/storefrontapp/src/main.ts (bootstrapApplication(AppComponent, appConfig))
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => console.error(error));
