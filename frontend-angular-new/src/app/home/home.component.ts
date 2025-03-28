import { Component, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly keycloak = inject(Keycloak)

  admin: boolean = false;
  loggedIn: boolean = true;

  login() {
    this.keycloak.login()
  }

  logout() {
    this.keycloak.logout
  }
}
