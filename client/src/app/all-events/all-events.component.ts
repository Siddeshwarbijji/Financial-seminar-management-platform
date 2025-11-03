import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: 'all-events',
    templateUrl: 'all-events.component.html'
})

export class AllEventsDetails implements OnInit {

    events: any[] = [];
    filteredEvents: any[] = [];
    searchTerm: string = '';
    noFound: boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    user: string | null = localStorage.getItem('username');

    images = ['https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600', 'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.webp?a=1&b=1&s=612x612&w=0&k=20&c=GANexorEVO7mDrp8JUHZKwoFbER0hfgrhu9pMkGfAq8=', 'https://media.istockphoto.com/id/1385168396/photo/people-registering-for-the-conference-event.webp?a=1&b=1&s=612x612&w=0&k=20&c=GGTu49ZlC-Kdmoi_E7GNFd_iQkx3RoACg9Wj9RwVPbA=', 'https://media.istockphoto.com/id/1130434203/photo/rear-view-of-sitting-audience.webp?a=1&b=1&s=612x612&w=0&k=20&c=t89dKSzB0Sk-n6SuV4Imf5064BuEThsJKP5xuImDUlM=', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvcmtzaG9wfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600', 'https://media.istockphoto.com/id/2209219861/photo/professional-group-discussion-in-modern-office-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=aKHHFqA0-i5FAyiDWFvEKs_6PIe3AoVAj2zY5tiTwBU=']

    constructor(private httpService: HttpService, private router: Router, private location: Location) { }

    ngOnInit(): void {
        this.httpService.viewAllEvents().subscribe({
            next: (data) => {
                this.events = data;
                this.filteredEvents = data;
            },
            error: (err) => {
                console.error('Error fetching events:', err);
            }
        });
    }
    
    filterEvents() {
        this.currentPage = 1;
        const term = this.searchTerm.toLowerCase();
        if (!term) {
            this.filteredEvents = this.events;
        }
        
        this.filteredEvents = this.events.filter(e =>
            e.title?.toLowerCase().includes(term) ||
            e.description?.toLowerCase().includes(term) ||
            e.location?.toLowerCase().includes(term) ||
            e.status?.toLowerCase().includes(term) ||
            e.schedule?.toLowerCase().includes(term)
        )
    }

    get paginatedEvents(): any[]{
        const startindex = (this.currentPage - 1)* this.itemsPerPage;
        return this.filteredEvents.slice(startindex, startindex + this.itemsPerPage);
    }

    get totalPages(): number{
        return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    }

    nextPage(){
        if(this.currentPage < this.totalPages){
            this.currentPage++;
        }
    }

    previousPage(){
        if(this.currentPage > 1){
            this.currentPage--;
        }
    }
    goBack(): void {this.location.back();}
}