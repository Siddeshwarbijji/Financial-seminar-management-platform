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
  loading: boolean = false;
  responseEmailMessgae: string = '';
  responseUsernameMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpService) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/)]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.itemForm.get('email')?.valueChanges.subscribe(email=>{
      if(email && email.length > 3){
        this.httpService.checkUserExists(email, '').subscribe(result =>{
          this.responseEmailMessgae = result.emailMessage;
        })
      }
      else{
        this.responseEmailMessgae = '';
      }
    })
    this.itemForm.get('username')?.valueChanges.subscribe(username=>{
      if(username && username.length > 3){
        this.httpService.checkUserExists('', username).subscribe(result =>{
          this.responseUsernameMessage = result.usernameMessage;
        })
      }
      else{
        this.responseUsernameMessage = '';
      }
    })
  }

  onRegister(): void {
    if (this.itemForm.valid) {
      this.loading = true;
      this.httpService.registerUser(this.itemForm.value).subscribe({
        next: () => {
          this.showMessage = true;
          this.responseMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.loading = false;
          }, 1500);
        },
        error: ()=>{
          this.showMessage = true;
          this.responseMessage = 'Registration failed';
        }
      });
    } else {
      this.loading = false;
      this.showMessage = true;
      this.responseMessage = 'Please fill all required fields correctly.';
    }
  }
}