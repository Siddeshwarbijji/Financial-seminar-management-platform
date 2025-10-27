import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName=environment.apiUrl;
 //todo: complete missing code..
  constructor(private httpClient:HttpClient){}
 
 









 AddFeedback(eventId:any,userId:any,details:any):Observable<any>
 {
    return this.httpClient.post<any>(`${this.serverName}`,details);
 }

 AddFeedbackByParticipants(eventId:any,userId:any,details:any):Observable<any>
 {
    return this.httpClient.post<any>(`${this.serverName}`,details);
 }
 
 getEventByInstitutionId(id:any):Observable<any>
 {
    return this.httpClient.get<any>(`${this.serverName}/${id}`);
 }

//  getEventByProfessional(id:any):Observable<any>
//  {
//     return this.httpClient.get<any>(`${this.serverName}/${id}`);
//  }

getEventByProfessional(userId:any){
   return of([
      {id:1,name:"EVENT A"},
      {id:2,name:"EVENT B"}
   ])
 }

 registerUser(details:any):Observable<any>{
   return this.httpClient.post<any>(`${this.serverName}`,details);
 }
}
