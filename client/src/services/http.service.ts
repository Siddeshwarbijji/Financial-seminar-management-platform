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

  constructor(private http: HttpClient) { }

  registerUser(details: any): Observable<any> {
    return this.http.post(this.serverName, details);
  }

  getEventByInstitutionId(id: any): Observable<any> {
    let params = new HttpParams();
    if (id) params = params.set('institutionId', id);
    return this.http.get(`${this.serverName}/api/institution/events`, { params });
  }

  addResourceToEvent(details: any): Observable<any> {
    // console.log("resource: ", details);
    // return of();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.serverName}/event/${details.event.id}/resource`, details, { headers });
  }



}
