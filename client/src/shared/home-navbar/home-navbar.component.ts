import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buffer } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})

export class HomeNavBarComponent implements OnInit {
    role: string = '';
    username:string='';
    email:string='';
  
    constructor(private router: Router, public authService: AuthService)
    {}
    ngOnInit(): void {
        // Fetch role from localStorage after login
        this.role = localStorage.getItem('role') || '';
        this.username= localStorage.getItem('username') || '';
        this.email= localStorage.getItem('email') || '';
      }
      logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      
    }
    
  