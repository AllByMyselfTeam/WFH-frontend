import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url:string;

  constructor(private http:HttpClient) { 
    this.url= environment.rootUri;
  }

  public getAllNotification(team:number):Observable<Notification[]>{
    return this.http.get<Notification[]>(this.url + '/notification/team/'+ team);
  }

  public deleteNotification(notifyId:number) {
    return this.http.delete(this.url + 'notification/' + notifyId);
  }

  public addNotify(notify: Notification):Observable<Notification>{
    return this.http.post<Notification>(this.url+'/notification/add/', notify);
  }
}
