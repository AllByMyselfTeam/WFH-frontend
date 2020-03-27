import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checklist } from 'src/app/models/checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  private url:string;
  constructor(private http:HttpClient) { 
    this.url="http://localhost:9000/";
  }

  public addChecklist(checklist: Checklist):Observable<Checklist> {
    return this.http.post<Checklist>(this.url +'checklist', checklist);
  }

  public updateChecklist(checklist: Checklist):Observable<Checklist> {
    return this.http.put<Checklist>(this.url+'checklist/' + checklist.checkId, checklist);
  }

  public getAllChecklist(userId:number):Observable<Checklist[]>{
    return this.http.get<Checklist[]>(this.url+"checklist/user/"+userId);
  }

  public deleteChecklist(checkId:number){
    return this.http.delete(this.url+"/checklist/"+ checkId);
  }


  // public getChecklistById

}
