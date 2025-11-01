import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss'],
  providers: [DatePipe]
})
// export class AddFeedbackComponent implements OnInit
// {//haven't implemented OnInit
//     formModel:any={status:null};
//     showError:boolean=false;
//     errorMessage:any;
//     eventList:any=[];
//     assignModel:any={};
//     selectedEvent:any={};
//     showMessage:any;
//     responseMessage:any;
//     updateId:any;
//     isAddRemarks:boolean=false;

//     constructor(private formBuilder:FormBuilder,private httpService:HttpService,private route:ActivatedRoute){
//       if(this.formModel.status===null)
//       {
//           this.formModel.status= "PENDING";
//       }
//     }

//     ngOnInit():void{
//         this.getEvent();
//     }

//     getEvent(){
//         // const id = this.route.snapshot.paramMap.get("userId");
//         const userid = localStorage.getItem("userId");
//         const eventId = this.route.snapshot.paramMap.get('eventId');
//         if(!userid)
//         {
//           this.showError=true;
//           this.errorMessage='User Id not found';
//           return;
//         }
//         this.httpService.getEventByProfessional(userid).subscribe({
//           next:(res)=>{
//               this.eventList=res;
//           },
//           error:(err)=>{
//             this.showError=true;
//             this.errorMessage=err.message;
//           }
//         });
//     }

//     addRemarks(val:any){
//         if(val)
//         {
//           this.updateId=val.id;
//           this.selectedEvent=val;
//           this.isAddRemarks=true;
//         }
//     }

//     saveFeedBack(){
//       const userid = localStorage.getItem("userId");
//       if(!userid||!this.updateId||this.formModel.content){
//           this.showError=true;
//           this.errorMessage="Missing required fields!"
//       }

//       this.httpService.AddFeedback(this.updateId,userid,this.formModel).subscribe({
//         next:(res)=>{
//           this.responseMessage='Feedback Submitted successfully!';
//           this.showMessage=true;
//         },
//         error:(err)=>{
//           this.showError=true;
//           this.errorMessage=err.message;
//         }
//       });
//     }
// }
// /*
// /client/src/app/
//     -add-resource
//     -assign-professional
//     -create-event
//     -dashboard
//     -login
//     -registration
//     -update-event-status
//     -view-events
//     (These 8 files will have .html, .scss, .ts files)
//   -services/
//     -auth.service.ts
//     -http.service.ts
// */
export class AddFeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  showError = false;
  errorMessage = '';
  showMessage = false;
  responseMessage = '';
  eventId: string = '';
  eventName: string = '';
  startAnimation = false;
showRocket = false;
downloading=true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}
  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      content: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('eventId') || '';
    });

    this.route.queryParamMap.subscribe(params => {
      this.eventName = params.get('eventName') || 'Selected Event';
    });
  }

  runRocketAnimation() {
    this.showRocket = true;
    this.startAnimation = true;
    setTimeout(() => {
      this.startAnimation = false;
      this.showRocket = false;
    }, 1700); // Match animation duration in ms
  }
  // submitFeedback(): void {
  //   if (this.feedbackForm.invalid) {
  //     this.showError = true;
  //     this.errorMessage = 'Please fill in the required fields!';
  //     this.runRocketAnimation();
  //     return;
  //   }

  //   const userId = localStorage.getItem('userId');
  //   const role = localStorage.getItem('userRole'); // 'professional' or 'participant'
  //   const feedbackData = this.feedbackForm.value;
  //   // if (!userId || !role) {
  //   //   this.showError = true;
  //   //   this.errorMessage = 'User information is missing!';
  //   //   return;
  //   // }
  //   let feedbackObservable;

  //   if (role?.toLowerCase() === 'professional') {
  //     feedbackObservable = this.httpService.AddFeedback(this.eventId, userId, feedbackData);
  //   } else if (role?.toLowerCase() === 'participant') {
  //     feedbackObservable = this.httpService.AddFeedbackByParticipants(this.eventId, userId, feedbackData);
  //   } 
  //   else {
  //     this.showError = true;
  //     this.errorMessage = 'Feedback is not allowed for your role.';
  //     return;
  //   }
  //   feedbackObservable.subscribe({
  //     next: () => {
  //       this.responseMessage = 'Feedback submitted successfully!';
  //       this.showMessage = true;
  //       this.showError = false;
  //       this.feedbackForm.reset();
  //       this.runRocketAnimation();
  //     },
  //     error: (err) => {
  //       this.showError = true;
  //       this.errorMessage = err.message;
  //     }
  //   });
  // }
  submitFeedback(): void {
    if (this.downloading) return;  // prevent multiple clicks
    
    if (this.feedbackForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Please fill in the required fields!';
      this.animateButtonState('Wrong');
      return;
    }
    this.showError = false;
  this.downloading = true;

  this.animateButtonState('Submit').then(() => {
    const userId = localStorage.getItem('userId') || '';
    const role = localStorage.getItem('userRole') || '';
    const feedbackData = this.feedbackForm.value;
    let feedbackObservable;
    if (role.toLowerCase() === 'professional') {
      feedbackObservable = this.httpService.AddFeedback(this.eventId, userId, feedbackData);
    } else if (role.toLowerCase() === 'participant') {
      feedbackObservable = this.httpService.AddFeedbackByParticipants(this.eventId, userId, feedbackData);
    } else {
      this.showError = true;
      this.errorMessage = 'Feedback is not allowed for your role.';
      this.downloading = false;
      this.animateButtonState('Wrong');
      return;
    }
    feedbackObservable.subscribe({
      next: () => {
        this.responseMessage = 'Feedback submitted successfully!';
        this.showMessage = true;
        this.feedbackForm.reset();
        this.downloading = false;
        this.animateButtonState('Submitted');
      },
      error: (err) => {
        this.showError = true;
        this.errorMessage = err.message;
        this.downloading = false;
        this.animateButtonState('Wrong');
      }
    });
  });
}
animateButtonState(state: 'Submit' | 'Submitted' | 'Wrong'): Promise<void> {
  return new Promise((resolve) => {
    const textEl = document.querySelector('.submit-btn .text') as SVGTextElement | null;
    const svgBtn = document.querySelector('.submit-btn') as SVGSVGElement | null;

    if (!textEl || !svgBtn) {
      resolve();
      return;
    }
    // Remove previous animation classes
    svgBtn.classList.remove('wrong-animation');

    if (state === 'Submit') {
      textEl.textContent = 'Submit';
    } else if (state === 'Submitted') {
      textEl.textContent = 'Submitted';
      svgBtn.style.filter = 'drop-shadow(0 0 10px #02fc86)';
      setTimeout(() => {
        svgBtn.style.filter = '';
      }, 1000);} else if (state === 'Wrong') {
        textEl.textContent = 'Wrong';
        svgBtn.classList.add('wrong-animation');
      }
      // For 'Wrong', revert text after 1.5s
      setTimeout(() => {
        if (state === 'Wrong') {
          textEl.textContent = 'Submit';
          svgBtn.classList.remove('wrong-animation');
        }
        resolve();
      }, 1500);
    });
  }
}