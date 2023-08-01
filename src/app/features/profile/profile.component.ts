import { ProfileService } from './profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { UserProfile } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.enum';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum MessageErrors {
  email = 'El email es requerido',
  email_hasError_email = 'Email inválido',
  name = 'El nombre es requerido',
  lastName = 'El apellido es requerido',
  country = 'El país es requerido',
  phoneNumber_hasError_pattern = 'El teléfono debe tener entre 7 y 10 dígitos',
  phoneCode_hasError_pattern = 'El código de país debe tener entre 1 y 4 dígitos',
  postalCode_hasError_pattern = 'El código postal debe tener entre 5 y 6 dígitos',
  description_hasError_maxLength = 'La descripción no puede tener más de 2000 caracteres',
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  isUpdatingProfile = false;

  profileForm = new FormGroup({
    role: new FormControl(false),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    address: new FormControl('', []),
    city: new FormControl('', []),
    postalCode: new FormControl('', [Validators.pattern(/^\d{5,6}$/)]),
    phone: new FormGroup({
      phoneCode: new FormControl('', [Validators.pattern(/^\+[1-9]\d{0,3}/)]),
      phoneNumber: new FormControl('', [Validators.pattern(/^\d{7,10}$/)]),
      sharePhone: new FormControl(false),
    }),
    description: new FormControl('', [Validators.maxLength(2000)]),
  });

  get form() {
    return this.profileForm as FormGroup;
  }

  isRequired(controlName: string): string {
    return this.form.get(controlName)?.hasError('required')
      ? MessageErrors[controlName as keyof typeof MessageErrors]
      : '';
  }

  hasError(input: string, validatorError: string) {
    return this.form.get(input)?.hasError(validatorError)
      ? MessageErrors[
          `${input}_hasError_${validatorError}` as keyof typeof MessageErrors
        ]
      : this.isRequired(input);
  }

  hasPatternError(input: string): string {
    if (input === 'postalCode') {
      return this.form.get(input)?.hasError('pattern')
        ? MessageErrors[
            `${input}_hasError_${'pattern'}` as keyof typeof MessageErrors
          ]
        : '';
    }
    const inputSplit = input.split('.');
    const phoneNumberControl = this.form.get(input);
    return phoneNumberControl?.hasError('pattern')
      ? MessageErrors[
          `${inputSplit[1]}_hasError_pattern` as keyof typeof MessageErrors
        ]
      : '';
  }

  getErrorMessage(input: string): boolean | undefined {
    const validation =
      this.form.get(input)?.invalid &&
      (this.form.get(input)?.dirty || this.form.get(input)?.touched);
    return validation;
  }

  async ngSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.setRole();
    const userProfile: UserProfile = this.form.value;
    this.isUpdatingProfile = true;
    this.snackBar.open('Perfil actualizado', 'Cerrar', {
      duration: 2000,
    });
    console.log(userProfile);
    /* await this.profileService.updateProfile(userProfile).subscribe({
      next: () => {
        console.log('Profile updated');
      },
      error: error => {
        this.snackBar.open('Error al intentar actualizar, intente en unos minutos', 'Ok', {
          duration: 2000,
        });
        console.log(error);
      },
      complete: () => {
        this.snackBar.open('Perfil actualizado', 'Cerrar', {
          duration: 2000,
        });
        this.isUpdatingProfile = false;
        this.router.navigate(['/']);
      },
    }); */
  }

  setRole() {
    const setRole = this.form.get('role')?.value;
    this.form.value.role = setRole ? Role.HIRER : Role.LODGER;
  }
}
