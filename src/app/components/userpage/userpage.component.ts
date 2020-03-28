import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from 'src/app/services/checklist/checklist.service';
import { Checklist } from 'src/app/models/checklist';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  userId:number;
  user: User;
  checklist : Checklist;
  checklistForm:FormGroup;
  checks:Checklist[];
  show:boolean;
  message:string = "";
  afterCheck:Checklist;
  constructor(private activeRoute:ActivatedRoute,
              private checkService:ChecklistService,
              private userService:UserService,
              private formBuilder:FormBuilder,
              private router:Router) {
                this.checklist = new Checklist();
                this.user= new User();
              }

  ngOnInit(): void {
    
    this.userId = +this.activeRoute.snapshot.paramMap.get("id");
    this.checklistForm = this.formBuilder.group({
      checkTitle:[''],
      checkDescription:['']
    });
    this.userService.getUserById(this.userId).subscribe(userData =>{
      this.user = userData;
      if(this.user.teams.length != 0){
        this.show=true;
      }else{
        this.show=false;
      }
      
      
    });
    this.checkService.getAllChecklist(this.userId).subscribe(data=>{
      this.checks = data;
    });
    
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.checklistForm.invalid) {
        return;
    }else{
      this.checklist.uid=this.userId;
      this.checkService.addChecklist(this.checklist).subscribe(res=>{
        
        this.ngOnInit();
        this.message = "Complete add checklist";
        //this.router.navigate([`${"userpage"}/${this.userId}`]);
     });
    }
}
editChecklist(check:Checklist){
  this.checkService.updateChecklist(check).subscribe(data=>{
    this.afterCheck = data;
    this.message = "Complete update "+ check.checkTitle;
  });
}
removeCheck(checkId:number){
  this.checkService.deleteChecklist(checkId).subscribe(data=>{
    this.message = "Complete remove checklist";
    this.ngOnInit();
  })
}
  
}
