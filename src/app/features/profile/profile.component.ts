import { ProfileService } from './services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import {
  User,
  UserProfile,
  setUserProfileForm,
  userSubmit,
} from 'src/app/features/profile/models/user.model';
import { Router } from '@angular/router';
import {
  checkValidation,
  hasError,
  hasPatternError,
} from 'src/app/shared/helpers/forms.helper';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private _notification = inject(NotificationService);
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
    const userProfile: UserProfile = this.form.value;
    const userForSubmit: User = userSubmit(userProfile);
    this.profileService.updateProfile(userForSubmit).subscribe({
      next: () => {
        this._notification.showSuccess('Perfil actualizado');
      },
      error: error => {
        this._notification.showSuccess(
          'Error al intentar actualizar, intente en unos minutos'
        );
        console.error(error);
      },
      complete: () => {
        this._notification.showSuccess('Perfil actualizado');
        this.router.navigate(['/']);
      },
    });
  }
}
