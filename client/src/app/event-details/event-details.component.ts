import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})

export class EventDetailsComponent implements OnInit{
    event: any;
    role: string = '';
    showFeedback: boolean = false;
    addFeedback: boolean = false;
    showUpdateStatus: boolean = false;
    alreadyEnrolled: boolean = false;
    enrollments: any[] = [];
    message: boolean = false;
    loading: boolean = false;
    eventCompleted: boolean = false;
    

    constructor(private route : ActivatedRoute, private router: Router, private httpService: HttpService){}
    ngOnInit(): void {
        this.role = localStorage.getItem('role')!;
        const eventId = Number(this.route.snapshot.queryParamMap.get('eventId'));
        const userId = Number(localStorage.getItem('userId'));
        if(eventId){
            this.httpService.getEventById(eventId).subscribe({
                next: (data)=> {
                    this.event = data;
                    this.eventCompleted = data.status.toLowerCase() === 'completed'
                    console.log("event status ",this.eventCompleted);
                    this.httpService.isUserEnrolled(userId, eventId).subscribe({
                        next: (status)=>{
                            this.alreadyEnrolled = status;
                        }
                    })
                }
            })
            // this.event.professionals.events.enrollments
            // console.log(this.event);
        }
        // this.httpService.getEnrollments(id).subscribe({
        //     next: (data)=> this.enrollments = data
        // })
    }

    enrollEvent(){
        if(this.alreadyEnrolled){
            // console.log("here");
            return;
        }
        this.loading = true;
        this.httpService.EnrollParticipant(this.event.id, Number(localStorage.getItem('userId'))).subscribe({
            next: ()=> {
                this.alreadyEnrolled = true;
                this.message = true;
                this.router.navigate(['/dashboard']);
                this.loading = false;
            }
        })
    }
    showFeedbacks(){
        this.showFeedback = !this.showFeedback;
    }
    handleFeedback(){
        this.addFeedback = !this.addFeedback;
    }
    handleUpdateEventStatus(){
        // this.showUpdateStatus = !this.showUpdateStatus;
        this.router.navigate(['/update-event-status', this.event.id]);
    }
}