import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [],
})
export class HomeComponent {
  private keycloak = inject(KeycloakService); // <-- Użyj inject()

  isLoggedIn = false;
  username = '';

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      const userProfile = await this.keycloak.loadUserProfile();
      this.username = userProfile.username ?? '';
    }
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
