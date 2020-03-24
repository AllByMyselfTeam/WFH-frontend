import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserpageComponent } from './components/userpage/userpage.component';
import { LogoutComponent } from './components/logout/logout.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ChecklistComponent,
    NavbarComponent,
    LoginComponent,
    TaskComponent,
    UserpageComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule 
  ],
  providers: [

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
