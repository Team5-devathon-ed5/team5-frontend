import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/validators/custom.validators';
import { NotificationService } from '../../../shared/services/notification.service';
import {
  hasError,
  checkValidation,
} from '../../../shared/helpers/forms.helper';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../forgot-password/forgot-password.component.scss'],
})
export class ResetPasswordComponent {
  payload: string;
  hide = true;
  hideConfirmPassword = true;

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _notification: NotificationService
  ) {
    this.payload = this.route.snapshot.paramMap.get('payload') ?? '';
  }

  resetPassForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        CustomValidators.checkPassword,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        CustomValidators.checkPassword,
      ]),
    },
    { validators: [CustomValidators.passwordsMatching] }
  );

  get f() {
    return this.resetPassForm;
  }

  checkData(input: string) {
    return checkValidation(this.f, input);
  }

  checkErrors(input: string, validatorError: string) {
    return hasError(this.f, input, validatorError);
  }

  resetPassword() {
    if (!this.f.valid) {
      return;
    }

    this.service.resetPassword(this.payload, this.f.value.password).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        const message = err.status === 403 ? 'Token Invalido' : err.statusText;
        throw Error(message);
      },
      complete: () => {
        this._notification.showSuccess('Contraseña actualizada');
      },
    });
  }
}
