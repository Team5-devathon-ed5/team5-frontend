import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from '../../../shared/validators/custom.validators';
import { AuthRegister } from '../models/auth.model';
import {
  checkValidation,
  hasError,
} from '../../../shared/helpers/forms.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private service = inject(AuthService);
  private router = inject(Router);

  hide = true;
  hideConfirmPassword = true;

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        CustomValidators.checkPassword,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        CustomValidators.checkPassword,
      ]),
      // name: new FormControl('', [Validators.required]),
      // surname: new FormControl('', [Validators.required]),
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
    console.log(this.f);
    if (!this.f.valid) {
      return;
    }
    this.service.register(this.f.value as AuthRegister);
  }
}
