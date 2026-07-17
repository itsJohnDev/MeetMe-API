import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginCreds } from '../../types/users';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { BusyService } from '../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected busyService = inject(BusyService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: LoginCreds = {
    email: '',
    password: '',
  };

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        this.creds = {
          email: '',
          password: '',
        };
      },
      error: (error) => {
        this.toast.error('Invalid credentials.');
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.toast.success('Logged out successfully.');
    this.router.navigateByUrl('/');
  }
}
