import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  itemForm: FormGroup;
  formModel: any = {};
  showPassword = false;
  showError = false;
  errorMessage: any;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]]
    });
 
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.itemForm.valid) {
      this.loading = true;
      this.httpService.login(this.itemForm.value).subscribe({
        next: (res: any) => {
          // console.log("Inside the next");
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('username', res.username);
          localStorage.setItem('email', res.email);
          this.router.navigate(['/dashboard']);
          this.loading = false;
        },
        error: (err:any) => {
          // console.log("Inside error");
          this.showError = true;
          this.errorMessage = err.error.message || 'Login failed. Please try again.';
          this.loading = false;
        }
      });
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }

  registration() {
    this.router.navigate(['/registration']);
  }
}