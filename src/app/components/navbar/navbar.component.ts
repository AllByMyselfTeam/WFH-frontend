import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  fname: string;

  constructor(
    public authenticationService: AuthenticationService,
    private userService: UserService
    ) { 
      
    }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn){
      this.fname = sessionStorage.getItem('fname');
    }
  }

}
