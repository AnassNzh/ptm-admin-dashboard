import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToTransactions() {
    this.router.navigate(['/transactions']);
  }
}
