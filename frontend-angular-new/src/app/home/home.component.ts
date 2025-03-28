// import { Component, inject, OnInit } from '@angular/core';
// import Keycloak from 'keycloak-js';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

//   keycloakService = inject(Keycloak);

//   admin: boolean = false;
//   loggedIn: boolean = false;
//   roles: string[] = [];



//   login() {
//     this.keycloakService.login();
//   }

//   logout() {
//     this.keycloakService.logout();
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  roles: string[] = [];
  admin = true;

  async ngOnInit() {
    try {
      await this.keycloak.init({ onLoad: 'login-required' });

      if (this.keycloak.authenticated) {
        const token = this.keycloak.token;
        if (token) {
          this.roles = this.extractRoles(token);
          if (this.roles.includes('admin')) {
            this.admin = false;
          }
        }
      }
    } catch (error) {
      console.error('Keycloak initialization failed', error);
    }
  }

  private extractRoles(token: string): string[] {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Dekodowanie tokena JWT
    return decoded?.realm_access?.roles || []; // Pobranie ról z `realm_access`
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}