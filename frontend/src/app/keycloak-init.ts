import { KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER, Provider } from '@angular/core';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180',
        realm: 'projekt-realm',
        clientId: 'angular-app',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ['/assets'],
    });
}

export function provideKeycloak(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    deps: [KeycloakService],
    multi: true,
  };
}
