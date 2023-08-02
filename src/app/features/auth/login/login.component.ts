import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import {
  checkValidation,
  hasError,
} from './../../../shared/helpers/forms.helper';
import { AuthLogin } from '../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private service = inject(AuthService);
  private router = inject(Router);
  constructor() {
    sessionStorage.clear();
  }

  hide = true;

  passwordControl: FormControl = new FormControl('', Validators.required);
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
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

  async login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      await this.service.login({ username, password } as AuthLogin).subscribe({
        next: response => {
          this.service.setTokenId(response);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
