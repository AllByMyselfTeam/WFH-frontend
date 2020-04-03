import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from 'src/app/models/team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url:string;

  constructor(private http:HttpClient) { 
    this.url="http://localhost:9000/";
  }

  public addTeam(team:Team, userid:number):Observable<Team>{
    return this.http.put<Team>(this.url+"addTeam/"+userid, team);
  }

  public joinTeam(userid:number, teamid:number):Observable<Team>{
    return this.http.get<Team>(this.url+"joinTeam/"+userid + "/" + teamid);
  }
}
