import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RsvpComponent } from './rsvp/rsvp.component';
import { VenueComponent } from './venue/venue.component';
import { AccomodationsComponent } from './accomodations/accomodations.component';
import { DietaryComponent } from './dietary/dietary.component';
import { ThingsToDoComponent } from './things-to-do/things-to-do.component';
import { TransportationComponent } from './transportation/transportation.component';
import { GuestbookComponent } from './guestbook/guestbook.component';
import { RsvpFormComponent } from './rsvp/form/rsvp-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestOverviewComponent } from './admin/guest-overview/guest-overview.component';
import { AddGuestComponent } from './admin/add-guest/add-guest.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
	declarations: [
		HomeComponent,
		SignInComponent,
		RsvpComponent,
		VenueComponent,
		AccomodationsComponent,
		DietaryComponent,
		ThingsToDoComponent,
		TransportationComponent,
		GuestbookComponent,
		RsvpFormComponent,
		GuestOverviewComponent,
		AddGuestComponent,
		AdminComponent
	],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, BrowserModule, BrowserAnimationsModule, MaterialModule],
	exports: [
		HomeComponent,
		SignInComponent,
		RsvpComponent,
		VenueComponent,
		AccomodationsComponent,
		DietaryComponent,
		ThingsToDoComponent,
		TransportationComponent,
		GuestbookComponent,
		RsvpFormComponent,
		GuestOverviewComponent,
		AddGuestComponent,
		AdminComponent
	]
})
export class PagesModule {}
