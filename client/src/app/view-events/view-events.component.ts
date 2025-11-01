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
  eventList: any[] = [];
  workShopList: any = [];
  userId: any;
  selectedEvent: any = {};
  status: any;
  role: string | null = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  filteredEvents: any[] = [];
  searchTerm: string = '';

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
    if (this.role === 'INSTITUTION') {
      this.httpService.getEventByInstitutionId(this.userId).subscribe({
        next: (data) => {
          this.eventList = data;
          this.filteredEvents = data;
          console.log("insitution ", data);
        }
      })
    }
    else if (this.role === 'PROFESSIONAL') {
      this.httpService.getEventByProfessional(this.userId).subscribe({
        next: (data) => {
          this.eventList = data;
          this.filteredEvents = data;
          // console.log("proff ", data);
        }
      })
    }
    else {
      this.httpService.getEnrolledEvents(this.userId).subscribe({
        next: (data) => {
          this.eventList = data;
          this.filteredEvents = data;
          // console.log("parti ", data);
        }
      })
    }
  }

  // viewDetails: Assigns selected event for further actions
  viewDetails(id: any): void {
    this.router.navigate(['/event-details', id]);
  }

  navigateIfAllowed(domEvent: MouseEvent,event: any, path: string) {
    domEvent.stopPropagation();
    if (event.status === 'Completed') {
      console.log("prevent default");
      domEvent.preventDefault();
      return;
    }
    if (path === '/assign-professional') {
      console.log(event.title);
      this.router.navigate([path], { queryParams: { eventId: event.id, title: event.title } });
      return;
    }
    this.router.navigate([path], { queryParams: { eventId: event.id } });
  }

  navigateParticipantIfAllowed(domEvent: MouseEvent, event: any, path: string) {
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

  filterEvents() {
    this.currentPage = 1;
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filteredEvents = this.eventList;
    }

    this.filteredEvents = this.eventList.filter(e =>
      e.title?.toLowerCase().includes(term) ||
      e.description?.toLowerCase().includes(term) ||
      e.location?.toLowerCase().includes(term) ||
      e.status?.toLowerCase().includes(term) ||
      e.schedule?.toLowerCase().includes(term)
    )
    // console.log(this.filteredEvents);
  }
}