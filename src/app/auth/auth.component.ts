import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginError: string = '';
  subscription!: Subscription;
  loading = false;
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private notification: NzNotificationService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.logout();
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,3})$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  userLogin(): void {
    this.loading = true;
    console.log('login clicked', this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    this.email = this.loginForm.get('email')?.value;
    this.password = this.loginForm.get('password')?.value
    if (this.loginForm.valid) {
      this.authService.login(this.email, this.password).subscribe(
        response => {
          console.log('login succ comp')
          this.loading = false;
          this.router.navigate(['/dashboard']);

        },
        error => {
          console.log('login failed comp', error.error)
          this.loading = false;
          this.notification.error('Error', error.error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (!this.subscription) {
      return;
    } else {
      return this.subscription.unsubscribe();
    }
  }

}
