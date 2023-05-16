import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { PymkComponent } from './pymk/pymk.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { StatsComponent } from './stats/stats.component';
import { HashtagsComponent } from './hashtags/hashtags.component';
import { PostComponent } from './shared/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponentComponent,
    LoginComponentComponent,
    HomePageComponent,
    NavbarComponent,
    CreateEventComponent,
    CreatePostComponent,
    UpcomingEventsComponent,
    PymkComponent,
    MyProfileComponent,
    StatsComponent,
    HashtagsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
