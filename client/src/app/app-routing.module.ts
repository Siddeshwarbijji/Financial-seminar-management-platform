import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


import { AppComponent } from './app.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

import { CreateEventComponent } from './create-event/create-event.component';
import { AddResourceComponent } from './add-resource/add-resource.component';

import { ViewEventsComponent } from './view-events/view-events.component';

import { AssignProfessionalComponent } from './assign-professional/assign-professional.component';
import { UpdateEventStatusComponent } from './update-event-status/update-event-status.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AllEventsDetails } from './all-events/all-events.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomePageComponent } from './home/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'create-event', component: CreateEventComponent },  
  { path: 'add-resource', component: AddResourceComponent }, 
  { path: 'assign-professional', component: AssignProfessionalComponent },  
  { path: 'update-event-status', component: UpdateEventStatusComponent }, 
  { path: 'add-feedback', component: AddFeedbackComponent }, 
  { path: 'view-events', component: ViewEventsComponent },  
  {path: 'event-details', component: EventDetailsComponent},
  {path: 'all-events', component: AllEventsDetails},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'home', component: HomePageComponent},
  
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
