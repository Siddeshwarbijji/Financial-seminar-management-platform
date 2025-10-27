import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm!: FormGroup;
  showMessage: boolean = false;
  responseMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpService) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*a-z)(?=.*[0-9])(?=.*[\W_]).{8,}$/)]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log("In reg oage");
  }

  onRegister(): void {
    if (this.itemForm.valid) {
      this.httpService.registerUser(this.itemForm.value).subscribe({
        next: () => {
          this.showMessage = true;
          this.responseMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login page
          }, 2000);
        }
      });
    } else {
      this.showMessage = true;
      this.responseMessage = 'Please fill all required fields correctly.';
    }
  }
}