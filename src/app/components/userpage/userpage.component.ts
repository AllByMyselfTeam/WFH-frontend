import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from 'src/app/services/checklist/checklist.service';
import { Checklist } from 'src/app/models/checklist';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team/team.service';
import { AlertService } from 'src/app/services/alert/alert.service';


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

  team:Team;
  teamForm:FormGroup;
  joinTeamForm: FormGroup;

  constructor(private activeRoute:ActivatedRoute,
              private checkService:ChecklistService,
              private teamService:TeamService,
              private userService:UserService,
              private formBuilder:FormBuilder,
              private router:Router,
              private alert:AlertService) {
                this.checklist = new Checklist();
                this.user= new User();
                this.team = new Team();
              }

  ngOnInit(): void {
    
    this.userId = +this.activeRoute.snapshot.paramMap.get("id");
    this.checklistForm = this.formBuilder.group({
      checkTitle:[''],
      checkDescription:['']
    });
    this.teamForm = this.formBuilder.group({
      teamName:[''],
    });
    this.joinTeamForm = this.formBuilder.group({
      teamId:[''],
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
        this.alert.success("Checklist has been added");
       
        //this.router.navigate([`${"userpage"}/${this.userId}`]);
     },
     (error)=>{
       this.alert.error(error.error.error)
     });
    }
}
editChecklist(check:Checklist){
  this.checkService.updateChecklist(check).subscribe(data=>{
    this.afterCheck = data;
    this.alert.success("Complete update "+ check.checkTitle);
  },
  (error)=>{
    this.alert.error(error.error.error)
  });
}
removeCheck(checkId:number){
  this.checkService.deleteChecklist(checkId).subscribe(data=>{
    this.ngOnInit();
    this.alert.success("Checklist has been removed");
  },
  (error)=>{
    this.alert.error(error.error.error)
  })
}
  onSubmitTeam() {
    // stop here if form is invalid
    if (this.teamForm.invalid) {
        return;
    }else{
      this.team.managerId=this.userId;
      this.teamService.addTeam(this.team, this.user.userId).subscribe(res=>{
        this.team = new Team();
        this.ngOnInit();
        this.alert.success(this.team.teamName + " has been created");
      },
      (error)=>{
        this.alert.error(error.error.error)
      });
    }
  }

  onSubmitJoinTeam() {
    // stop here if form is invalid
    if (this.joinTeamForm.invalid) {
        return;
    }else{
      this.teamService.joinTeam(this.user.userId, this.team.teamId).subscribe(res=>{
        this.team = new Team();
        this.ngOnInit();
      });
    }
  }

  refreshUser(deleteBool:boolean){
    // this.getCommunityByTitle();
  }
  
}
