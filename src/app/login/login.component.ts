import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  result: any;

  hide = true;

  passwordControl: FormControl = new FormControl('', Validators.required);
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  proceedlogin() {
    if (this.loginForm.valid) {
      this.service.GetUserbyCode(this.loginForm.value.id).subscribe(item => {
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
