import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.post<any>(`${this.serverName}/api/institution/event`, event,{headers});
   }

   addResourceToEvent(details: any): Observable<any> {
      // console.log("resource: ", details);
      // return of();
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(`${this.serverName}/event/${details.event.id}/resource`, details, { headers });
   }

   getEventByInstitutionId(institutionId: any): Observable<any> {
      let params = new HttpParams();
      if (institutionId) params = params.set('institutionId', institutionId);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.get(`${this.serverName}/api/institution/events?institutionId=${institutionId}`, { headers });
   }

   AddFeedback(eventId: any, userId: any, details: any): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.post<any>(`${this.serverName}/api/professional/event/${eventId}/feedback?userId=${userId}`, details, { headers });
   }

   AddFeedbackByParticipants(eventId: any, userId: any, details: any): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.post<any>(`${this.serverName}/api/participant/event/${eventId}/feedback`, details, { params });
   }

   getEventByProfessional(userId: any): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.get<any>(`${this.serverName}/api/professional/events?userId=${userId}`, { headers })
   }

   getEventById(eventId: number): Observable<any> {
      // console.log("Getting id");
      // return of();
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.get<any>(`${this.serverName}/event/${eventId}`);
   }

   updateEventStatus(eventId: number, status: string): Observable<any> {
      let params = new HttpParams();
      if (status) params = params.set('status', status);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.put<any>(`${this.serverName}/api/professional/event/${eventId}/status?status=${status}`, {},{ headers});
   }

   GetAllProfessionals(): Observable<any> {
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.get<any>(`${this.serverName}/api/institution/event/professionals`,{headers});
   }

   GetAllevents(): Observable<any> {
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.get<any>(`${this.serverName}/api/finance/events`,{headers});
   }

   viewAllEvents(): Observable<any> {
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.get<any>(`${this.serverName}/api/participant/events`,{headers});
   }

   viewEventStatus(eventId: Number): Observable<any> {
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.get<any>(`${this.serverName}/api/participant/event/${eventId}/status`,{headers})
   }

   EnrollParticipant(eventId: Number, userId: number): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.post<any>(`${this.serverName}/api/participant/event/${eventId}/enroll?userId=${userId}`, {},{ headers })
   }

   updateEvent(eventId: Number, details: any): Observable<any> {
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.put<any>(`${this.serverName}/api/institution/event/${eventId}`, details,{headers});
   }

   addResource(details: any): Observable<any> {
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.post<any>(`${this.serverName}/api/institution/event/${details.eventId}/resource`, details,{headers});
   }

   assignProfessionals(eventId: Number, userId: number): Observable<any> {
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      console.log(eventId, userId);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      //return of();
      return this.httpClient.post<any>(`${this.serverName}/api/institution/event/${eventId}/professional?userId=${userId}`,{}, { headers })
   }

   UpdateEventStatus(eventId: Number, status: string) {
      let params = new HttpParams();
      if (status) params = params.set('status', status);
      const headers = new HttpHeaders({
         'Content-Type':'application/json',
         'Authorization':'Bearer mockToken'
      })
      return this.httpClient.put<any>(`${this.serverName}/api/professional/event/${eventId}/status?status=${status}`,{}, { headers })
   }

   getEnrolledEvents(userId: number):Observable<any>{
      let params = new HttpParams();
      if (userId) params = params.set('userId', userId);
      return this.httpClient.get<any>(`${this.serverName}/api/participant/enrolled-events`, {params})
   }
}
