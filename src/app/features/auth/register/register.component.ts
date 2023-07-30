import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  proceedregister() {
    if (this.registerForm.valid) {
      this.service.RegisterUser(this.registerForm.value).subscribe(result => {
        this.router.navigate(['login']);
      });
    } else {
      console.log('Please enter valid data.');
    }
  }
}
