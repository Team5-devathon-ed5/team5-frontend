import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from '../../../shared/validators/custom.validators';
import { AuthRegister } from '../models/auth.model';

export enum RequiredMessages {
  required = 'Campo requerido',
  email_hasError_email = 'Email incorrecto',
  username_hasError_minlength = '4 caracteres alfanuméricos',
  password_hasError_requirements = '8 caracteres alfanuméricos y una mayúscula',
  confirmPassword_hasError_requirements = '8 caracteres alfanuméricos y una mayúsculas',
}

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

  checkValidation(input: string): boolean | undefined {
    const validation =
      this.f.get(input)?.invalid &&
      (this.f.get(input)?.dirty || this.f.get(input)?.touched);
    return validation;
  }

  hasError(input: string, validatorError: string) {
    return this.f.get(input)?.hasError(validatorError)
      ? RequiredMessages[
          `${input}_hasError_${validatorError}` as keyof typeof RequiredMessages
        ]
      : this.isRequired(input);
  }

  isRequired(controlName: string): string {
    return this.f.get(controlName)?.hasError('required')
      ? RequiredMessages['required' as keyof typeof RequiredMessages]
      : '';
  }

  register() {
    console.log(this.f);
    if (!this.f.valid) {
      return;
    }
    this.service.register(this.f.value as AuthRegister);
  }

  regizster() {
    if (this.registerForm.valid) {
      this.service.RegisterUser(this.registerForm.value).subscribe(() => {
        this.router.navigate(['login']);
      });
    } else {
      console.log('Please enter valid data.');
    }
  }
}
