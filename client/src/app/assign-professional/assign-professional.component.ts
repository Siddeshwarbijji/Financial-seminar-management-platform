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
  selectedEvent: any = { name: "Financial planning seminar" };

  // professionals = [
  //   { username: 'rahul.sharma', email: 'rahul.sharma@finhub.com' },
  //   { username: 'emma.watson', email: 'emma.watson@finhub.com' },
  //   { username: 'john.carter', email: 'john.carter@finhub.com' },
  //   { username: 'anita.kapoor', email: 'anita.kapoor@finhub.com' }
  // ];
  professionals: any[] = []

  selectedProfessional: any;
  // assignedProfessionals: any[] = [];

  itemForm!: FormGroup;
  eventId: any;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    // const idFromRoute = this.route.snapshot.paramMap.get('eventId');
    // if (idFromRoute) this.selectedEvent = { id: idFromRoute, name: `Event ${idFromRoute}` };

    // const state: any = this.location.getState();
    // if (state && state.event) this.selectedEvent = state.event;
    // this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.eventId = null;
    this.initializeForm();
    if (this.eventId) {
      this.itemForm.patchValue({ eventId: this.eventId });
    }
    this.httpService.GetAllProfessionals().subscribe({
      next: (data) => {
        this.professionals = data;
      }
    })
  }

  initializeForm() {
    this.itemForm = this.fb.group({
      eventId: [null, [Validators.required]],
      userId: [null, [Validators.required]]
    })
  }

  onCheckboxChange(prof: any, event: any): void {
    if (event.target.checked) {
      console.log("selectng")
      this.selectedProfessional = prof;
      this.itemForm.patchValue({ userId: prof.id || prof.userId })
      console.log(this.itemForm.value);
    } else {
      console.log("fake")
      this.selectedProfessional = null;
      this.itemForm.patchValue({ userId: null })
    }
  }

  // toggleSelectAll(event: any): void {
  //   if (event.target.checked) {
  //     this.selectedProfessionals = [...this.professionals];
  //   } else {
  //     this.selectedProfessionals = [];
  //   }
  // }

  isChecked(prof: any): boolean {
    return this.selectedProfessional?.username === prof.username;
  }

  assignSelectedProfessionals() {
    if (this.itemForm.valid) {
      console.log("here")
      this.httpService.assignProfessionals(this.itemForm.value.eventId, this.itemForm.value.userId).subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        }
      })
    }
    console.log("outside")
  }

  // assignSelectedProfessionals(): void {
  //   this.assignedProfessionals = [...this.selectedProfessionals];
  //   console.log('Assigned Professionals:', this.assignedProfessionals);
  //   setTimeout(() => {
  //     this.router.navigate(['/dashboard']);
  //   }, 1500);
  // }
}
