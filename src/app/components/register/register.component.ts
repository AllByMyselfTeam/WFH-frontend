import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User;

  constructor(private userService: UserService) {
    this.user = new User();
   }

  ngOnInit(): void {
  }

  register() {
    this.userService.addUser(this.user).subscribe();
    this.user = new User();
  }
  // @Input() error: string | boolean;

}
