import { ProfileService } from './profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { UserProfile } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.enum';
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
    role: new FormControl(false),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
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

  ngOnInit(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (userProfile: UserProfile) => {
        console.log(userProfile);
        const roleM: boolean = userProfile.role === Role.HIRER;
        this.profileForm.patchValue({
          role: roleM,
          email: userProfile.email,
          name: userProfile.name,
          lastName: userProfile.lastName,
          country: userProfile.country,
          address: userProfile.address,
          city: userProfile.city,
          postalCode: userProfile.postalCode,
          phone: {
            phoneCode: userProfile.phone?.phoneCode?.toString() || '',
            phoneNumber: userProfile.phone?.phoneNumber?.toString() || '',
            sharePhone: userProfile.phone?.sharePhone || false,
          },
          description: userProfile.description,
        });
      },
      error: () => {
        this.snackBar.open(
          'Error al intentar actualizar, intente en unos minutos',
          'Ok',
          {
            duration: 2000,
          }
        );
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
    this.snackBar.open('Perfil actualizado', 'Cerrar', {
      duration: 2000,
    });
    console.log(userProfile);
    this.profileService.updateProfile(userProfile).subscribe({
      next: () => {
        console.log('Profile updated');
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
