/**
 * Avvio sul server: una nuova applicazione per ogni richiesta (il context arriva da CommonEngine).
 * Ispirato a: projects/storefrontapp/src/main.server.ts
 */
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
