import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import {
  checkValidation,
  hasError,
} from './../../../shared/helpers/forms.helper';
import { AuthLogin } from '../models/auth.model';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private service: AuthService,
    private router: Router,
    private _notification: NotificationService
  ) {}

  hide = true;

  passwordControl: FormControl = new FormControl('', Validators.required);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      CustomValidators.checkPassword,
    ]),
  });

  get f() {
    return this.loginForm;
  }

  checkData(input: string) {
    return checkValidation(this.f, input);
  }

  checkErrors(input: string, validatorError: string) {
    return hasError(this.f, input, validatorError);
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.service.login({ email, password } as AuthLogin).subscribe({
        next: data => {
          localStorage.setItem('token', data.jwTtoken);
          this.router.navigate(['/abled']);
        },
        error: err => {
          const message =
            err.status === 400 ? 'Credenciales inválidas' : err.statusText;
          throw Error(message);
        },
        complete: () => {
          this._notification.showSuccess('Contraseña aceptada. Bienvenid@!');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
