import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

import { AssignProfessionalComponent } from './assign-professional/assign-professional.component';
import { UpdateEventStatusComponent } from './update-event-status/update-event-status.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { AuthInterceptor } from './auth.interceptors';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AllEventsDetails } from './all-events/all-events.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../shared/footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomePageComponent } from './home/home-page.component';
import { HomeNavBarComponent } from '../shared/home-navbar/home-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashbaordComponent,
    CreateEventComponent,
    AddResourceComponent,
    ViewEventsComponent,
    NavbarComponent,
    AssignProfessionalComponent,
    UpdateEventStatusComponent,
    AddFeedbackComponent,
    EventDetailsComponent,
    AllEventsDetails,
    FooterComponent,
    AboutUsComponent,
    HomePageComponent,
    HomeNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [HttpService, HttpClientModule, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
