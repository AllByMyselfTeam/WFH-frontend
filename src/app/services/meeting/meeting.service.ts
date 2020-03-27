import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from 'src/app/models/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private url:string;

  constructor(private http:HttpClient) {
    this.url="http://localhost:9000/";
  }

  public getAllMeeting(team:number):Observable<Meeting[]>{
    return this.http.get<Meeting[]>(this.url+'/meeting/team/'+team);
  }

}
