import { Injectable } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloak: KeycloakService ) {}

  async initKeycloak(): Promise<void> {
    try {
      await this.keycloak.init({
        config: {
          url: 'http://localhost:8180/auth',
          realm: 'projekt-realm',
          clientId: 'angular-app',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets', '/clients/public']

        
      });

      console.log('Keycloak init success');
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }
  
  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  getRoles(): string[] {
    return this.keycloak.getUserRoles();
  }
}
