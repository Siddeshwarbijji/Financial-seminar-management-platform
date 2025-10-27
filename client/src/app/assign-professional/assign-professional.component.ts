import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assign-professional',
  templateUrl: './assign-professional.component.html',
  styleUrls: ['./assign-professional.component.scss']
})
export class AssignProfessionalComponent implements OnInit {
  selectedEvent: any = {name: "Financial planning seminar"};

  professionals = [
    { username: 'rahul.sharma', email: 'rahul.sharma@finhub.com' },
    { username: 'emma.watson', email: 'emma.watson@finhub.com' },
    { username: 'john.carter', email: 'john.carter@finhub.com' },
    { username: 'anita.kapoor', email: 'anita.kapoor@finhub.com' }
  ];
  
  selectedProfessionals: any[] = [];
  assignedProfessionals: any[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private router: Router) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('eventId');
    if (idFromRoute) this.selectedEvent = { id: idFromRoute, name: `Event ${idFromRoute}` };

    const state: any = this.location.getState();
    if (state && state.event) this.selectedEvent = state.event;
  }

  onCheckboxChange(prof: any, event: any): void {
    if (event.target.checked) {
      this.selectedProfessionals.push(prof);
    } else {
      this.selectedProfessionals = this.selectedProfessionals.filter(
        (p) => p.username !== prof.username
      );
    }
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedProfessionals = [...this.professionals];
    } else {
      this.selectedProfessionals = [];
    }
  }

  isChecked(prof: any): boolean {
    return this.selectedProfessionals.some((p) => p.username === prof.username);
  }

  assignSelectedProfessionals(): void {
    this.assignedProfessionals = [...this.selectedProfessionals];
    console.log('Assigned Professionals:', this.assignedProfessionals);
    setTimeout(()=>{
      this.router.navigate(['/dashboard']);
    }, 1500);
  }
}
