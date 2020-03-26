import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthguardService } from './services/authguard/authguard.service';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent },
  {path:"register", component:RegisterComponent },
  {path:"userpage/:id", component:UserpageComponent, canActivate:[AuthguardService] },
  {path:"logout", component:LogoutComponent, canActivate:[AuthguardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
