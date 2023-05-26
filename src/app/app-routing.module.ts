import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
import { MessagingComponent } from './messages/messages.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full'},
  { path: 'login', component: LoginComponentComponent},
  { path: 'signup', component: SignupComponentComponent},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: MessagingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
