import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { scheduled } from 'rxjs';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {//they haven't implemented OnInit we implemented it 

  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: string = '';
  eventList: any = [] = [];
  assignModel: any = {};
  showMessage: boolean = false;
  responseMessage: string = "";
  updateId: number | null = null;
  minDateTime: string = '';

  institutionId: string | null = null;//Additionally added
  itemForm!: FormGroup;
  // role: string = '';
  canDisable: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.itemForm = this.formBuilder.group({
      title: [undefined, [Validators.required]],
      institutionId: [undefined],  //[{ value: localStorage.getItem('userId')}]
      description: [undefined, [Validators.required, Validators.minLength(3)]],
      schedule: [undefined, [Validators.required]],
      location: [undefined, [Validators.required]],
      status: [undefined, [Validators.required]]
      // status: [{value: 'Up-coming'}]
    })
  }

  ngOnInit(): void {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);

    const eventId = Number(this.route.snapshot.queryParamMap.get('eventId'));
    this.updateId = eventId;

    this.canDisable = localStorage.getItem('role')! !== 'INSTITUTION';
    if (eventId) {
      this.httpService.getEventById(eventId).subscribe({
        next: (res) => {
          this.itemForm.patchValue(res);
        }
      });
    }
    this.itemForm.patchValue({ institutionId: localStorage.getItem('userId') });

  }


  onSubmit() {
    if (!this.itemForm.valid) {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields.';
      return;
    }
    if (this.updateId) {
      this.httpService.updateEvent(this.updateId, this.itemForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          return;
        },
        error: (error: any) => {
          this.showError = true;
          this.errorMessage = error;
          return;
        }
      })
      return;
    }
    const event = {
      ...this.itemForm.value,
      institutionId: localStorage.getItem('userId')
    }
    this.httpService.createEvent(event).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.showError = true;
        this.errorMessage = error;
      }
    })
    this.showError = false;
  }

  // onEdit() {
  //   if (!this.itemForm.valid) {
  //     this.showError = true;
  //     this.errorMessage = 'Please fill all required fields.';
  //     return;
  //   }
  //   this.showError = false;
  // }

  showInvalidPopup() {
    if (this.itemForm.invalid) {
      alert('Please fill out all required fields correctly before submitting.');
    }
  }
}