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
        next: (data) => {
          this.eventList = data
          console.log("insitution ", data);
        }
      })
    }
    else if (this.role === 'PROFESSIONAL') {
      this.httpService.getEventByProfessional(this.userId).subscribe({
        next: (data) => {
          this.eventList = data
          console.log("proff ", data);
        }
      })
    }
    else {
      this.httpService.getEnrolledEvents(this.userId).subscribe({
        next: (data) => {
          this.eventList = data
          console.log("parti ", data);
        }
      })
    }
    // this.getEvent();
  }

  // viewDetails: Assigns selected event for further actions
  viewDetails(id: any): void {
    this.router.navigate(['/event-details', id]);
  }

  // saveFeedBack: Submits feedback for the selected event
  // saveFeedBack(): void {
  //   if (!this.selectedEvent || !this.formModel.feedback) {
  //     this.showError = true;
  //     this.errorMessage = 'Please provide feedback.';
  //     return;
  //   }

  //   const timestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  //   const payload = {
  //     eventId: this.selectedEvent.id,
  //     userId: this.userId,
  //     feedback: this.formModel.feedback,
  //     timestamp
  //   };
  // }

  navigateIfAllowed(event: any, path: string){
    if(event.status === 'Completed'){
      return;
    }
    this.router.navigate([path], {queryParams: {eventId: event.id}});
  }

  navigateParticipantIfAllowed(event: any, path: string){
    if(event.status === 'Upcoming'){
      return;
    }
    this.router.navigate([path], {queryParams: {eventId: event.id}});
  }
}