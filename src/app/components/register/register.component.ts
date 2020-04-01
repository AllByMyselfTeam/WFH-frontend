import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User;
  errorMessage:any;
  successMessage:String;


  constructor(private userService: UserService, public validationService: ValidationService) {
    this.user = new User();
    this.errorMessage = "";
   }

  ngOnInit(): void {
  }

  register() {
    this.errorMessage = null;
    this.successMessage = null;
    this.userService.addUser(this.user).subscribe(user => this.user = user, 
      error=>this.errorMessage = error.error.error,
      () => {if( this.errorMessage == null){
      this.successMessage = "User Registered!"
      }
    });

    this.user = new User();
  }
  // @Input() error: string | boolean;

}
