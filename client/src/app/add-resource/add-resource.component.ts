import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from '../services/http.service';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  itemForm: FormGroup;
  eventList: any[] = [];
  showError: boolean = false;
  errorMessage: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';

  constructor(private fb: FormBuilder, private httpService: HttpService, private route: ActivatedRoute, private router: Router, private location: Location) {
    this.itemForm = this.fb.group({
      eventId: [null, [Validators.required]],
      description: [undefined, [Validators.required]],
      type: [undefined, [Validators.required]],
      availabilityStatus: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.queryParamMap.get('eventId');
    this.itemForm.patchValue({ eventId: eventId });
    this.getEventsForInstitution();
  }

  /**
   * Fetch events for logged-in institution
   */
  getEventsForInstitution(): void {
    // const institutionId = localStorage.getItem('institutionId'); // Ensure this is set after login
    // if (!institutionId) {
    //   this.showError = true;
    //   this.errorMessage = 'Institution ID is missing. Please log in again.';
    //   return;
    // }

    // this.httpService.getEventByInstitutionId(institutionId).subscribe({
    //   next: (res: any) => {
    //     this.eventList = res || [];
    //   },
    //   error: (err: any) => {
    //     this.showError = true;
    //     this.errorMessage = 'Failed to fetch events. Please try again later.';
    //   }
    // });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Please fill all mandatory fields correctly.';
      return;
    }

    // const selectedEventId = this.itemForm.value.eventId;
    // const resourceDetails = {
    //   description: this.itemForm.value.description,
    //   type: this.itemForm.value.type,
    //   availabilityStatus: this.itemForm.value.availabilityStatus
    // };
    this.httpService.addResource(this.itemForm.value).subscribe({
      next: ()=>{
        this.router.navigate(['/dashboard']);
      }
    })

    // this.httpService.addResourceToEvent(selectedEventId, resourceDetails).subscribe({
    //   next: (res: any) => {
    //     this.showMessage = true;
    //     this.responseMessage = 'Resource added successfully!';
    //     this.itemForm.reset();
    //   },
    //   error: (err: any) => {
    //     this.showError = true;
    //     this.errorMessage = 'Failed to add resource. Please try again.';
    //   }
    // });
  }

  goBack(): void {
    this.location.back();
  }
}