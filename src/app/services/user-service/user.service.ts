import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string;

  constructor(private http:HttpClient) {  
    this.url="http://localhost:9000/";
   }

   public getUserByUsername(username:string){}

   public login(user:User):Observable<User>{
     return this.http.post<User>(this.url+"/login", user);
   }

   public register(user:User):Observable<User>{
     return this.http.post<User>(this.url+"/register", user);
   }

  // public getSessionId():Observable<Sesh>{
  //   return this.http.get<Sesh>(this.url+"/login/sid")
  // }
}
