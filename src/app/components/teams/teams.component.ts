import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  @Input() team:Team; 
  @Output() private deleteEmitter:EventEmitter<boolean>;
  user: User;

  constructor(private userService: UserService) {
    this.deleteEmitter = new EventEmitter<boolean>();
   }

  ngOnInit(): void {
    this.userService.getUserById(+sessionStorage.getItem("id")).subscribe(user => this.user = user);
  }

  // this.threadService.deleteThread(thread.id, this.community.id).subscribe(data => {
  //   this.deleteEmitter.emit(deleteBool);
  // });

}
