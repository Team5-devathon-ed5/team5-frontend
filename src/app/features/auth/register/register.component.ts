import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from '../../../shared/validators/custom.validators';
import { AuthRegister } from '../models/auth.model';
import {
  checkValidation,
  hasError,
} from '../../../shared/helpers/forms.helper';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  hideConfirmPassword = true;

  constructor(
    private service: AuthService,
    private router: Router,
    private _notification: NotificationService
  ) {}

  registerForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        CustomValidators.checkPassword,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        CustomValidators.checkPassword,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    },
    { validators: [CustomValidators.passwordsMatching] }
  );

  get f() {
    return this.registerForm;
  }

  checkData(input: string) {
    return checkValidation(this.f, input);
  }

  checkErrors(input: string, validatorError: string) {
    return hasError(this.f, input, validatorError);
  }

  register() {
    if (!this.f.valid) {
      return;
    }
    this.service.register(this.f.value as AuthRegister).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        const message =
          err.status === 400 ? 'El email ya está en uso' : err.statusText;
        throw Error(message);
      },
      complete: () => {
        this._notification.showSuccess('Registro completado');
      },
    });
  }
}
