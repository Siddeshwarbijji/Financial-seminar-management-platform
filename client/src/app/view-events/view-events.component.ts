import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss'],
  providers: [DatePipe]
})
export class ViewEventsComponent implements OnInit, AfterViewInit {
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
  searchTerm: string = '';
  sortBy: string = '';
  filteredEvents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    public authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    this.sortBy='schedule';
    if (this.role === 'INSTITUTION') {
      this.httpService.getEventByInstitutionId(this.userId).subscribe({
        next: (data) => {
          this.eventList = data
          this.filteredEvents = data;
          this.filteredEvents = [...this.eventList];
          this.applySort();
          console.log("insitution ", data);
        }
      })
    }
    else if (this.role === 'PROFESSIONAL') {
      this.httpService.getEventByProfessional(this.userId).subscribe({
        next: (data) => {
          this.eventList = data;
          this.filteredEvents = [...this.eventList];
          console.log("proff ", data);
        }
      })
    }
    else {
      this.httpService.getEnrolledEvents(this.userId).subscribe({
        next: (data) => {
          this.eventList = data;
          this.filteredEvents = [...this.eventList];
          console.log("parti ", data);
        }
      })
    }
    // this.getEvent();
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEvents = this.eventList.filter((event: { title: string; schedule: string; }) => {
      return event.title.toLowerCase().includes(term) || (event.schedule && event.schedule.toLowerCase().includes(term))
    })
  }

  applySort() {
    if (this.sortBy === 'location') {
      this.filteredEvents.sort((a, b) => a.location.localeCompare(b.location));
    }
    else if (this.sortBy === 'status') {
      this.filteredEvents.sort((a, b) => a.status.localeCompare(b.status));
    }
    else if (this.sortBy === 'schedule') {
      this.filteredEvents.sort((a, b) => a.schedule.localeCompare(b.schedule));
    }
  }

  // viewDetails: Assigns selected event for further actions
  viewDetails(id: any): void {
    this.router.navigate(['/event-details', id]);
  }

  navigateIfAllowed(domEvent: Event, event: any, path: string) {
    domEvent.stopPropagation();
    if (event.status === 'Completed') {
      domEvent.preventDefault();
      return;
    }
    if (path === '/assign-professional' || path === '/add-resource') {
      this.router.navigate([path], { queryParams: { eventId: event.id, title: event.title } });
      return;
    }
    this.router.navigate([path], { queryParams: { eventId: event.id } });
  }

  navigateParticipantIfAllowed(domEvent: Event, event: any, path: string) {
    domEvent.stopPropagation();
    if (event.status === 'Upcoming') {
      domEvent.preventDefault();
      return;
    }
    this.router.navigate([path], { queryParams: { eventId: event.id } });
  }

  get paginatedEvents(): any[] {
    const startindex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvents.slice(startindex, startindex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}