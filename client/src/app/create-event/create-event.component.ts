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
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: string = '';
  eventList: any = [] = [];
  assignModel: any = {};
  showMessage: boolean = false;
  responseMessage: string = "";
  updateId: number | null = null;

  institutionId: string | null = null;//Additionally added

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private route: ActivatedRoute) {
    this.itemForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      institutionId: [{ value: localStorage.getItem('userId') }],
      description: ['', [Validators.required, Validators.minLength(30)]],
      schedule: ['', [Validators.required]],
      location: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    console.log("eventId: ", eventId);
    if(eventId){
    this.route.paramMap.subscribe({
      next:(res)=>{
        this.itemForm.patchValue(res);
      }
    });
  }

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
    this.showError = false;
  }

  onEdit(){
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