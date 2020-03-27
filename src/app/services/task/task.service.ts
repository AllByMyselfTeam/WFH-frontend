import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url:string;
  constructor(private http:HttpClient) {
    this.url="http://localhost:9000/";
   }

   public addTask(task:Task):Observable<Task>{
     return this.http.post<Task>(this.url+'task', task);
   }

   public updateTask(task:Task):Observable<Task>{
    return this.http.put<Task>(this.url+'task/'+ task.taskId, task);
  }

  public getAllTask(cid:number):Observable<Task[]>{
    return this.http.get<Task[]>(this.url+'task/check/'+cid);
  }

  public deleteTask(taskId:number): Observable<any>{

    return this.http.delete(this.url+"/task/"+ taskId);
  }
  
}
