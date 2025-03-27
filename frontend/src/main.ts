import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { provideKeycloak } from './app/keycloak-init';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    KeycloakService,
    provideKeycloak(),
  ],
}).catch((err) => console.error(err));
