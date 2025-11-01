import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  event: any;
  feedbackForm: any;
  success: boolean = false;
  eventId: number | null = null;
  role: string = '';
  loading: boolean = false;
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]]
    })

    this.eventId = Number(this.route.snapshot.queryParamMap.get('eventId'));
    this.role = localStorage.getItem('role')!;

    if (this.eventId) {
      this.httpService.getEventById(this.eventId).subscribe(data => {
        this.event = data;
        console.log(this.event);
      })
    }
  }
  SubmitFeedback() {
    if (this.feedbackForm.valid) {
      this.loading = true;
      if (this.role === 'PROFESSIONAL') {
        this.httpService.AddFeedback(this.eventId, Number(localStorage.getItem('userId')), this.feedbackForm.value).subscribe({
          next: () => {
            setTimeout(() => {
              this.loading = false;
              this.success = true;
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        })
      }
      else {
        this.httpService.AddFeedbackByParticipants(this.eventId, Number(localStorage.getItem('userId')), this.feedbackForm.value).subscribe({
          next: () => {
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        })
      }
    }
    else {
      alert('Please enter your feedback before submitting!');
    }
  }
  goBack(): void {
    this.location.back();
  }
}