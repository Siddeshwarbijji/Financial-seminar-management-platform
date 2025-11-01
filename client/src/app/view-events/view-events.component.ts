import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss'],
  providers: [DatePipe]
})
export class ViewEventsComponent implements OnInit {
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventObj: any = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  isUpdate: any = false;
  eventList: any = [];
  workShopList: any = [];
  userId: any;
  selectedEvent: any = {};
  status: any;
  role: string | null = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    public authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    if (this.role === 'INSTITUTION') {
      this.httpService.getEventByInstitutionId(this.userId).subscribe({
        next: (data)=> this.eventList = data
      })
    }
    else if (this.role === 'PROFESSIONAL') {
      this.httpService.getEventByProfessional(this.userId).subscribe({
        next: (data)=> this.eventList = data
      })
    }
    else {
      this.httpService.getEnrolledEvents(this.userId).subscribe({
        next: (data)=> this.eventList = data
      })
    }
    this.getEvent();
  }
  
  // getEvent: Fetches all events and stores them in eventList
  getEvent(): void {
    // this.httpService.get('/events').subscribe({
    //   next: (data: any[]) => {
    //     this.eventList = data;
    //   },
    //   error: () => {
    //     this.showError = true;
    //     this.errorMessage = 'Failed to load events.';
    //   }
    // });
    // this.eventList=[
    //   {
    //     id:1,
    //     title:'Java Basics',
    //     schedule: new Date('2025-11-10'),
    //     location: 'Hyd',
    //     status:'Not started'
    //   },
    //   {
    //     id:2,
    //     title:'Python Basics',
    //     schedule: new Date('2025-10-27'),
    //     location: 'Chennai',
    //     status:'Ongoing'
    //   },
    //   {
    //     id:1,
    //     title:'Spring Basics',
    //     schedule: new Date('2025-10-10'),
    //     location: 'Bangalore',
    //     status:'Completed'
    //   }
    // ];

  }

  // enroll: Enrolls the user in an event and refreshes the list
  enroll(eventId: any): void {
    // this.httpService.post(`/events/${eventId}/enroll`, { userId: this.userId }).subscribe({
    //   next: () => {
    //     this.getEvent();
    //     this.showMessage = true;
    //     this.responseMessage = 'Enrollment successful!';
    //   },
    //   error: () => {
    //     this.showError = true;
    //     this.errorMessage = 'Enrollment failed.';
    //   }
    // });
  }

  // viewDetails: Assigns selected event for further actions
  viewDetails(val: any): void {
    this.selectedEvent = val;
  }

  // saveFeedBack: Submits feedback for the selected event
  saveFeedBack(): void {
    if (!this.selectedEvent || !this.formModel.feedback) {
      this.showError = true;
      this.errorMessage = 'Please provide feedback.';
      return;
    }

    const timestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const payload = {
      eventId: this.selectedEvent.id,
      userId: this.userId,
      feedback: this.formModel.feedback,
      timestamp
    };

    // this.httpService.post('/feedback', payload).subscribe({
    //   next: () => {
    //     this.getEvent();
    //     this.selectedEvent = {};
    //     this.formModel.feedback = '';
    //     this.showMessage = true;
    //     this.responseMessage = 'Feedback submitted successfully.';
    //   },
    //   error: () => {
    //     this.showError = true;
    //     this.errorMessage = 'Failed to submit feedback.';
    //   }
    // });
  }

  // checkStatus: Retrieves and stores the status of an event
  // checkStatus(eventId: any): void {
  //   this.httpService.get(`/events/${eventId}/status`).subscribe({
  //     next: (res: any) => {
  //       this.status = res.status;
  //       console.log('Status:', this.status);
  //     },
  //     error: () => {
  //       this.showError = true;
  //       this.errorMessage = 'Failed to retrieve status.';
  //     }
  //   });
  // }
}