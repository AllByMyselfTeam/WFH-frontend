import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string;

  constructor(private http:HttpClient) {  
    this.url= environment.rootUri;
   }

   public getUserByUsername(username:string){}

   public getUser(user:User):Observable<User>{
     return this.http.post<User>(this.url+"login", user);
   }

   public addUser(user:User):Observable<User>{
     return this.http.post<User>(this.url+"register", user);
   }

   public getUserById(userId: number) {
     return this.http.get<User>(this.url + "user/"+ userId);
   }

  // public getSessionId():Observable<Sesh>{
  //   return this.http.get<Sesh>(this.url+"/login/sid")
  // }
}
