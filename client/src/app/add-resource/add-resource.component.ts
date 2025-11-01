import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from '../services/http.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {status:null};
  assignModel: any = {};
  eventList: any[] = [];
  showError: boolean = false;
  errorMessage: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.itemForm = this.fb.group({
      eventId: [this.formModel.eventId, [Validators.required]],
      description: [this.formModel.description, [Validators.required]],
      type: [this.formModel.type, [Validators.required]],
      availabilityStatus: [this.formModel.availabilityStatus, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getEvent();
    this.formModel.availabilityStatus=null;
  }

  /**
   * Fetch events for logged-in institution
   */
  getEvent(): void {
    const institutionId = localStorage.getItem('institutionId'); // Ensure this is set after login
    if (!institutionId) {
      this.showError = true;
      this.errorMessage = 'Institution ID is missing. Please log in again.';
      return;
    }

    this.httpService.getEventByInstitutionId(institutionId).subscribe({
      next: (res: any) => {
        this.eventList = res;
      },
      error: (err: any) => {
        this.showError = true;
        this.errorMessage = 'An error occured.. Please try again later.';
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
      description: this.itemForm.value.description,
      type: this.itemForm.value.type,
      availabilityStatus: this.itemForm.value.availabilityStatus
    };

    this.httpService.addResourceToEvent(resourceDetails).subscribe({
      next: (res: any) => {
        this.showMessage = true;
        this.responseMessage = 'Resource added successfully!';
        this.itemForm.reset();
      },
      error: (err: any) => {
        this.showError = true;
        this.errorMessage = 'Failed to add resource. Please try again.';
      }
    });
  }
}