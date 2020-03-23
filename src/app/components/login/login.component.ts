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
  constructor(private userService: UserService, private router:Router) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

    
  login() {
    console.log("login component" + this.userService.login(this.user).subscribe());
    this.user = new User();
    this.router.navigate(['./userpage'])
  }


}
