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
  errorMessage: any;
  eventList: any=[];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  updateId: any;

  institutionId: string | null = null;//Additionally added
  itemForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.itemForm = this.formBuilder.group({
      title: [this.formModel.title, [Validators.required]],
      institutionId: [this.formModel.institutionId],  //[{ value: localStorage.getItem('userId')}]
      description: [this.formModel.description, [Validators.required, Validators.minLength(3)]],
      schedule: [this.formModel.schedule, [Validators.required]],
      location: [this.formModel.location, [Validators.required]],
      status: [this.formModel.status, [Validators.required]]
    })
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    if (eventId) {
      this.route.paramMap.subscribe({
        next: (res) => {
          this.itemForm.patchValue(res);
        }
      });
    }
    this.itemForm.patchValue({institutionId: localStorage.getItem('userId')});

    // this.route.paramMap.subscribe(params=>{
    //   this.institutionId = params.get('userId');
    //   // this.updateId=params.get("eid");
    //   if(!this.institutionId){
    //     this.showError=true;
    //     this.errorMessage="Institution ID is missing/invalid";
    //     return;
    //   }
    //   // this.getEvent();
    // });
  }

  // getEvent(){
  //   if(!this.institutionId){
  //     this.showError=true;
  //     this.errorMessage='Institution ID is missing/invalid';
  //     return;
  //   }
  //   this.httpService.getEventsByInstitutionId(this.institutionId).subscribe({
  //     next:(res)=>{
  //       this.eventList=res;
  //       // this.updateId=res.id;
  //       this.showError=false;
  //     },
  //     error:(err)=>{
  //       this.showError=true;
  //       this.errorMessage="Error fetching events. Please try again later."
  //     }
  //   });
  // }

  // edit(val: any) {
  //   if (!val || !val.title || !val.description || !val.schedule || !val.location || !val.status) {
  //     this.showError = true;
  //     this.errorMessage = 'Incomplete event data.Please provide complete data'
  //     return;
  //   }
  //   this.updateId = val.id;
  //   this.itemForm.patchValue({
  //     title: val.title,
  //     description: val.description,
  //     schedule: val.schedule,
  //     location: val.location,
  //     status: val.status
  //   });
  // }

  onSubmit() {
    if (!this.itemForm.valid) {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields.';
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

  onEdit() {
    if (!this.itemForm.valid) {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields.';
      return;
    }
    this.showError = false;
  }

  showInvalidPopup() {
    if (this.itemForm.invalid) {
      alert('Please fill out all required fields correctly before submitting.');
    }
  }
}
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-create-event',
//   templateUrl: './create-event.component.html',
//   styleUrls: ['./create-event.component.scss']
// })
// export class CreateEventComponent implements OnInit {

//   itemForm: FormGroup; 
//   formModel:any={status:null};
//   showError:boolean=false;
//   errorMessage:any;
//   eventList:any=[];
//   assignModel: any={};

//   showMessage: any;
//   responseMessage: any;
//   updateId: any;
//   constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
//     {
//       this.itemForm = this.formBuilder.group({
//         title: [this.formModel.title,[ Validators.required]],      
//         schedule: [this.formModel.schedule,[ Validators.required]],
//         location: [this.formModel.location,[ Validators.required]],
//         status: [this.formModel.status,[ Validators.required]],
//         description: [this.formModel.description,[ Validators.required]],
//         institutionId: [this.formModel.institutionId],
      
     
       
//     });

   
//   }
//   ngOnInit(): void {

//     this.getEvent();
//   }
//   getEvent() {
//     this.eventList=[];
//     const userIdString = localStorage.getItem('userId');
//     const userId = userIdString ? parseInt(userIdString, 10) : null;
//     this.itemForm.controls["institutionId"].setValue(userId)
//     this.httpService.getEventByInstitutionId(userId).subscribe((data: any) => {
//       this.eventList=data;
//       console.log(this.eventList);
//     }, error => {
//       // Handle error
//       this.showError = true;
//       this.errorMessage = "An error occurred.. Please try again later.";
//       console.error('Login error:', error);
//     });;
//   }
//   edit(val:any)
//   {
//     this.itemForm.patchValue(val);
//     this.updateId=val.id;
//   }
 
//   onSubmit()
//   {
    
//       if (this.itemForm.valid) {
//         if(this.updateId==null)
//         {
//           this.showError = false;
//           const userIdString = localStorage.getItem('userId');
//           const userId = userIdString ? parseInt(userIdString, 10) : null;
//           this.itemForm.controls["institutionId"].setValue(userId)
//           this.httpService.createEvent(this.itemForm.value).subscribe((data: any) => {
//             this.itemForm.reset();
//             this.getEvent();
            
//           }, error => {
//             // Handle error
//             this.showError = true;
//             this.errorMessage = "An error occurred while created in. Please try again later.";
//             console.error('Login error:', error);
//           });;
//         }
//         else{
//           this.showError = false;
//           const userIdString = localStorage.getItem('userId');
//           const userId = userIdString ? parseInt(userIdString, 10) : null;
//           this.itemForm.controls["institutionId"].setValue(userId)
//           this.httpService.updateEvent(this.updateId,this.itemForm.value).subscribe((data: any) => {
//             this.itemForm.reset();
//             this.getEvent();
//             this.updateId=null;
            
//           }, error => {
//             // Handle error
//             this.showError = true;
//             this.errorMessage = "An error occurred while created in. Please try again later.";
//             console.error('Login error:', error);
//           });;
//         }
       
//       } else {
//         this.itemForm.markAllAsTouched();
//       }
    
   
//   }

  
// }

