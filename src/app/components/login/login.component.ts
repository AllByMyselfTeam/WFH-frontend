import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  errorMessage:string;
  
  constructor(private userService: UserService, private router:Router) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

    
  login() {
    this.userService.getUser(this.user).subscribe(
      user => {
        if(user != null){
          this.user = user;
          sessionStorage.setItem('username', user.username)
          sessionStorage.setItem('fname', user.fname)
          sessionStorage.setItem('id', user.userId.toString())
          this.router.navigate([`${"userpage"}/${user.userId}`])
        } else {
          this.errorMessage = "Invalid Username or Password"
        }
      }
    );
    this.user = new User();
  }


}
