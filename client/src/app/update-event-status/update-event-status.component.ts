import { Component, createPlatform, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { last } from 'rxjs';

@Component({
  selector: 'app-update-event-status',
  templateUrl: './update-event-status.component.html',
  styleUrls: ['./update-event-status.component.scss'],
  providers: [DatePipe]
})
export class UpdateEventStatusComponent{

  itemForm!: FormGroup;
  eventId!: number;
  successMessage:string='';
  loading:boolean=false;
  lastUpdated:Date=new Date();

  constructor(private route:ActivatedRoute,private fb:FormBuilder,private httpService:HttpService)
  {}

  ngOnInit(){
    const eventId=this.route.snapshot.paramMap.get('id');
    this.createForm();
    if(eventId)
    {
      this.loadEventDetails(Number(eventId));
    }
  }
  
  createForm(){
    this.itemForm=this.fb.group({
      eventTitle:[{ value: '', disabled: true}],
      description: [{ value: '', disabled: true}],
      schedule: [{ value: '', disabled: true}],
      location: [{ value: '', disabled: true}],
      status: ['' , Validators.required],   //Editable
   });
  }
  

loadEventDetails(eventId:number)
{
  this.httpService.getEventById(eventId).subscribe((event)=>{

      this.itemForm.patchValue({
        eventTitle: event.title,
        description: event.description,
        schedule: event.schedule,
        location: event.location,
        status: event.status
      });
  });
}

updateStatus(){

  if(this.itemForm.valid)
  {
    const updatedStatus=this.itemForm.get('status')?.value;
    this.loading=true;
    this.httpService.updateEventStatus(this.eventId,updatedStatus).subscribe(()=>{
    this.loading=false;
     this.successMessage='Status updated successfully!';
     this.lastUpdated=new Date();
     setTimeout(()=>this.successMessage='',3000);
    })
  }
}
}




