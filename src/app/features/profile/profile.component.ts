import { ProfileService } from './services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import {
  User,
  UserProfile,
  setUserProfileForm,
} from 'src/app/features/profile/models/user.model';
import { Role } from 'src/app/features/profile/models/role.enum';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  checkValidation,
  hasError,
  hasPatternError,
} from 'src/app/shared/helpers/forms.helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  isUpdatingProfile = false;

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneCode: new FormControl('', [Validators.pattern(/^\+[1-9]\d{0,3}/)]),
    phoneNumber: new FormControl('', [Validators.pattern(/^\d{7,10}$/)]),
    phoneShare: new FormControl(false),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    imageUrl: new FormControl('', []),
    detail: new FormControl('', [Validators.maxLength(2000)]),
    address: new FormControl('', []),
    country: new FormControl('', [Validators.required]),
    role: new FormControl(false),
  });

  ngOnInit(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (user: User) => {
        console.group('Saliente');
        console.log(user);
        console.groupEnd();
        this.profileForm.patchValue(setUserProfileForm(user));
      },
    });
  }

  get form() {
    return this.profileForm as FormGroup;
  }

  checkErrors(input: string, validatorError: string) {
    return hasError(this.form, input, validatorError);
  }

  checkPatternErros(input: string): string {
    return hasPatternError(this.form, input);
  }

  checkData(input: string): boolean | undefined {
    return checkValidation(this.form, input);
  }

  async ngSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.setRole();
    const userProfile: UserProfile = this.form.value;
    this.isUpdatingProfile = true;
    console.group('Saliente');
    console.log(userProfile);
    console.groupEnd();
    this.profileService.updateProfile(userProfile).subscribe({
      next: () => {
        this.snackBar.open('Perfil actualizado', 'Cerrar', {
          duration: 2000,
        });
      },
      error: error => {
        this.snackBar.open(
          'Error al intentar actualizar, intente en unos minutos',
          'Ok',
          {
            duration: 2000,
          }
        );
        console.error(error);
      },
      complete: () => {
        this.snackBar.open('Perfil actualizado', 'Cerrar', {
          duration: 2000,
        });
        this.isUpdatingProfile = false;
        this.router.navigate(['/']);
      },
    });
  }

  setRole() {
    const setRole = this.form.get('role')?.value;
    this.form.value.role = setRole ? Role.HIRER : Role.LODGER;
  }
}
