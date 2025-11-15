import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { Location } from "@angular/common";

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})

export class EventDetailsComponent implements OnInit {
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
    buttonClicked: boolean = false;
    participantStatus: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService, private location: Location) { }
    ngOnInit(): void {
        this.role = localStorage.getItem('role')!;
        const eventId = Number(this.route.snapshot.queryParamMap.get('eventId'));
        const userId = Number(localStorage.getItem('userId'));
        if (eventId) {
            this.httpService.getEventById(eventId).subscribe({
                next: (data) => {
                    this.event = data;
                    this.eventCompleted = data.status.toLowerCase() === 'completed'
                    this.httpService.isUserEnrolled(userId, eventId).subscribe({
                        next: (status) => {
                            this.alreadyEnrolled = status;

                            if (this.role === 'PARTICIPANT') {
                                const enrollment = data.enrollments.find((e: any) => e.participant.id === userId);
                                if (enrollment) {
                                    this.participantStatus = enrollment.status.toLowerCase();
                                }
                            }
                        }
                    })
                }
            })
        }
    }

    updateEnrollmentStatus(enrollmentId: number, status: string) {
        this.buttonClicked = true;
        this.httpService.acceptRejectEnrollment(enrollmentId, status).subscribe({
            next: (updatedEnrollment) => {
                const index = this.event.enrollments.findIndex((e: any) => e.id === enrollmentId);
                if (index > -1) {
                    this.event.enrollments[index].status = status;  // update locally
                }
            },
            error: (err) => console.error(`Error updating status to ${status}`, err)
        });
    }

    enrollEvent() {
        if (this.alreadyEnrolled) {
            return;
        }
        this.loading = true;
        this.httpService.EnrollParticipant(this.event.id, Number(localStorage.getItem('userId'))).subscribe({
            next: () => {
                this.alreadyEnrolled = true;
                this.message = true;
                this.router.navigate(['/dashboard']);
                this.loading = false;
            }
        })
    }
    
    showFeedbacks() {
        this.showFeedback = !this.showFeedback;
    }
    handleFeedback() {
        this.addFeedback = !this.addFeedback;
    }
    handleUpdateEventStatus() {
        // this.showUpdateStatus = !this.showUpdateStatus;
        this.router.navigate(['/update-event-status', this.event.id]);
    }
    goBack(): void { this.location.back(); }
}