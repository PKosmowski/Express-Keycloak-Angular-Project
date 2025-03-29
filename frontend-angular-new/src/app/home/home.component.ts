import { Component, inject } from '@angular/core';
// import { keycloak } from '../../keycloak-init';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  roles: string[] = [];
  isLoggedIn: boolean = false;
  admin: boolean = false;

  private readonly keycloak = inject(Keycloak);

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  getUserRoles(): any {
    this.roles = this.keycloak.tokenParsed?.realm_access?.roles || [];
  }
}
