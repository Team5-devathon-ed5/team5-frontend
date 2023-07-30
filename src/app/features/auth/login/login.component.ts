import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
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
  result: any;

  hide = true;

  passwordControl: FormControl = new FormControl('', Validators.required);
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      CustomValidators.checkPassword,
    ]),
  });

  proceedlogin() {
    if (this.loginForm.valid) {
      this.service
        .GetUserbyCode(this.loginForm.value.id)
        .subscribe((item: any) => {
          this.result = item;
          if (this.result.password === this.loginForm.value.password) {
            if (this.result.isactive) {
              sessionStorage.setItem('username', this.result.id);
              sessionStorage.setItem('role', this.result.role);
              this.router.navigate(['']);
            } else {
              console.log('contacte a la compañia');
            }
          } else {
            console.log('colocar bien la informacion');
          }
        });
    } else {
      console.log('colocar informacion.');
    }
  }
}
