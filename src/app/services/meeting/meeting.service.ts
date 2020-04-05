import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from 'src/app/models/meeting';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private url:string;

  constructor(private http:HttpClient) {
    this.url= environment.rootUri;
  }

  public getAllMeeting(team:number):Observable<Meeting[]>{
    return this.http.get<Meeting[]>(this.url+'/meeting/team/'+team);
  }

  public addMeeting(meet: Meeting):Observable<Meeting>{
    return this.http.post<Meeting>(this.url+'/meeting/add/', meet);
  }

}
