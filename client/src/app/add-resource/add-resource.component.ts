import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Route } from '@angular/router';

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
  event: any={id: 1, name: "test"};

  constructor(private fb: FormBuilder, private httpService: HttpService, private route: ActivatedRoute) {
    this.itemForm = this.fb.group({
      resourceName: ['', [Validators.required, Validators.minLength(3)]],
      resourceType: ['', Validators.required],
      availabilityStatus: ['', Validators.required],
      // eventId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get("eventId");
    if(eventId){

    }
    this.getEventsForInstitution();
  }

  /**
   * Fetch events for logged-in institution
   */
  getEventsForInstitution(): void {
    const institutionId = localStorage.getItem('institutionId'); // Ensure this is set after login
    if (!institutionId) {
      //this.showError = true;
      //this.errorMessage = 'Institution ID is missing. Please log in again.';
      return;
    }

    this.httpService.getEventByInstitutionId(institutionId).subscribe({
      next: (res: any) => {
        this.eventList = res || [];
      },
      error: (err) => {
        this.showError = true;
        this.errorMessage = 'Failed to fetch events. Please try again later.';
      }
    });
  }

  /**
   * Submit resource details for selected event
   */
  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Please fill all mandatory fields correctly.';
      return;
    }

    const selectedEventId = this.itemForm.value.eventId;
    const resourceDetails = {
      resourceName: this.itemForm.value.resourceName,
      resourceType: this.itemForm.value.resourceType,
      availabilityStatus: this.itemForm.value.availabilityStatus
    };

    const resource = {
      ...this.itemForm.value,
      event: this.event
    }

    this.httpService.addResourceToEvent(resource).subscribe({
      next: (res: any) => {
        this.showMessage = true;
        this.responseMessage = 'Resource added successfully!';
        this.itemForm.reset();
      },
      error: (err) => {
        this.showError = true;
        this.errorMessage = 'Failed to add resource. Please try again.';
      }
    });
  }
}