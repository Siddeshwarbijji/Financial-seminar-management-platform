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
  // selectedEvent: any = { name: "Financial planning seminar" };

  professionals: any[] = [];
  eventProfessionals: any[] = [];

  selectedProfessional: any;
  successMessage: string = '';
  submitted: boolean = false;
  // assignedProfessionals: any[] = [];

  itemForm!: FormGroup;
  eventId: any;
  title: string = '';

  // successMessage:string = '';
  errorMessage:string='';

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.queryParamMap.get('eventId');
    this.title = this.route.snapshot.queryParamMap.get('title')!;
    this.initializeForm();
    if (this.eventId) {
      this.itemForm.patchValue({ eventId: this.eventId });
    }

    this.httpService.getEventById(this.eventId).subscribe({
      next: (data)=> {
        this.eventProfessionals = data.professionals;

        // Now fetch all the professionals
        this.httpService.GetAllProfessionals().subscribe({
          next: (allProfessionals: any[]) => {
            // this.professionals = data;
            const assignedIds = this.eventProfessionals.map((p: any)=> p.id);
            this.professionals = allProfessionals.filter((prof: any)=> !assignedIds.includes(prof.id));
          }
        })
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


  isChecked(prof: any): boolean {
    return this.selectedProfessional?.username === prof.username;
  }

  assignSelectedProfessionals() {
    if (this.itemForm.valid) {
      console.log("here")
      this.httpService.assignProfessionals(this.itemForm.value.eventId, this.itemForm.value.userId).subscribe({
        next: () => {
          this.submitted = false;
          this.successMessage = "Professional added successfully!"
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error :(error) =>{
          this.errorMessage = error.error.message || 'An unexpected error occured.'
        }
      })
    }
    console.log("outside")
  }

}
