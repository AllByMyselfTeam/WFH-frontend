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
  constructor(private activeRoute:ActivatedRoute,
              private checkService:ChecklistService,
              private userService:UserService,
              private formBuilder:FormBuilder,
              private router:Router) {
                this.checklist = new Checklist();

              }

  ngOnInit(): void {
    
    this.userId = +this.activeRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.userId).subscribe(userData =>{
      this.user = userData;
      if(this.user.team != 0){
        this.show=true;
      }else{
        this.show=false;
      }
    });
    this.checkService.getAllChecklist(1).subscribe(data=>{
      this.checks = data;
    });
    this.checklistForm = this.formBuilder.group({
      checkTitle:[''],
      checkDescription:['']
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.checklistForm.invalid) {
        return;
    }else{
      this.checklist.uid=this.userId;
      this.checkService.addChecklist(this.checklist).subscribe(res=>{
        this.checklist = res;
        this.ngOnInit();
        //this.router.navigate([`${"userpage"}/${this.userId}`]);
     });
    }
}
removeCheck(checkId:number){
  this.checkService.deleteChecklist(checkId).subscribe(data=>{
    this.ngOnInit();
  })
}
  
}
