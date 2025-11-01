import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root'
})
export class HttpService {
   public serverName = environment.apiUrl;
   //todo: complete missing code..
   constructor(private httpClient: HttpClient) { }

   registerUser(details: any): Observable<any> {
      return this.httpClient.post<any>(`${this.serverName}/api/user/register`, details);
   }

   login(data: { username: string; password: string }): Observable<any> {
      return this.httpClient.post(`${this.serverName}/api/user/login`, data);
   }

   createEvent(event: any): Observable<any> {
      return this.httpClient.post<any>(`${this.serverName}/api/institution/event`, event);
   }

   addResourceToEvent(details: any): Observable<any> {
      // console.log("resource: ", details);
      // return of();
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(`${this.serverName}/event/${details.event.id}/resource`, details, { headers });
   }

   getEventByInstitutionId(id: any): Observable<any> {
      let params = new HttpParams();
      if (id) params = params.set('institutionId', id);
      return this.httpClient.get(`${this.serverName}/api/institution/events`, { params });
   }

   AddFeedback(eventId: any, userId: any, details: any): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      return this.httpClient.post<any>(`${this.serverName}/api/professional/event/${eventId}/feedback`, details, { params });
   }

   AddFeedbackByParticipants(eventId: any, userId: any, details: any): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      return this.httpClient.post<any>(`${this.serverName}/api/participant/event/${eventId}/feedback`, details, { params });
   }

   getEventByProfessional(userId: any): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      return this.httpClient.get<any>(`${this.serverName}/api/professional/events`, { params })
   }

   getEventById(eventId: number): Observable<any> {
      return this.httpClient.get<any>(`${this.serverName}/api/institution/event/${eventId}`);
   }

   updateEventStatus(eventId: any, status: string): Observable<any> {
      let params = new HttpParams();
      if (status) params = params.set('status', status);
      return this.httpClient.put<any>(`${this.serverName}/api/professional/event/${eventId}/status?status=${status}`, { params });
   }

   GetAllProfessionals(): Observable<any> {
      return this.httpClient.get<any>(`${this.serverName}/api/institution/event/professionals`);
   }

   GetAllevents(): Observable<any> {
      return this.httpClient.get<any>(`${this.serverName}/api/participant/events`);
   }

   viewAllEvents(): Observable<any> {
      return this.httpClient.get<any>(`${this.serverName}/api/participant/events`);
   }

   viewEventStatus(eventId: Number): Observable<any> {
      return this.httpClient.get<any>(`${this.serverName}/api/participant/event/${eventId}/status`)
   }

   EnrollParticipant(eventId: Number, userId: number): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      return this.httpClient.post<any>(`${this.serverName}/api/participant/event/${eventId}/enroll?userId=${userId}`, { params })
   }

   updateEvent(eventId: Number, details: any): Observable<any> {
      console.log("event: ", details);
      console.log("eventID: ", eventId);
      // return of([]);
      return this.httpClient.put<any>(`${this.serverName}/api/institution/event/${eventId}`, details);
   }

   addResource(details: any): Observable<any> {
      return this.httpClient.post<any>(`${this.serverName}/api/institution/event/${details.eventId}/resource`, details);
   }

   assignProfessionals(eventId: Number, userId: number): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      // console.log(eventId, userId);
      // return of();
      return this.httpClient.post<any>(`${this.serverName}/api/institution/event/${eventId}/professional?userId=${userId}`, { params })
   }

   UpdateEventStatus(eventId: Number, status: string) {
      let params = new HttpParams();
      if (status) params = params.set('status', status);
      return this.httpClient.put<any>(`${this.serverName}/api/professional/event/${eventId}/status`, { params })
   }

   getEnrolledEvents(userId: number): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      return this.httpClient.get<any>(`${this.serverName}/api/participant/enrolled-events`, { params })
   }

   getEnrollments(eventId: number): Observable<any> {
      return this.httpClient.get<any>(`${this.serverName}/api/institution/event/${eventId}/enrollments`);
   }

   checkUserExists(email: string, username: string): Observable<{
      usernameMessage: string;
      emailMessage: any;
      emailExists: boolean;
      usernameExists: boolean
   }> {
      return this.httpClient.post<{ emailExists: boolean; usernameExists: boolean; emailMessage: string; usernameMessage: string }>(`${this.serverName}/api/user/check-user`, { email, username })
         .pipe(catchError(() => of({emailExists: false, usernameExists: false, emailMessage: '', usernameMessage: ''})))
   }

   isUserEnrolled(userId: number, eventId: number){
      return this.httpClient.get<boolean>(`${this.serverName}/api/participant/isenrolled/${userId}/${eventId}`);
   }
}
