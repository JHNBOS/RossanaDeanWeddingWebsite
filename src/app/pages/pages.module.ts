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
import { PlacesToEatComponent } from './places-to-eat/places-to-eat.component';
import { RsvpFormComponent } from './rsvp/form/rsvp-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestOverviewComponent } from './admin/guest-overview/guest-overview.component';
import { AddGuestComponent } from './admin/add-guest/add-guest.component';
import { AdminComponent } from './admin/admin.component';
import { EditGuestComponent } from './admin/edit-guest/edit-guest.component';
import { DietaryOverviewComponent } from './admin/dietary-overview/dietary-overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ThanksComponent } from './thanks/thanks.component';

@NgModule({
	declarations: [
		HomeComponent,
		SignInComponent,
		RsvpComponent,
		VenueComponent,
		AccomodationsComponent,
		DietaryComponent,
		PlacesToEatComponent,
		RsvpFormComponent,
		GuestOverviewComponent,
		AddGuestComponent,
		AdminComponent,
		EditGuestComponent,
		DietaryOverviewComponent,
		ContactFormComponent,
		ThanksComponent
	],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, BrowserModule, TranslateModule, BrowserAnimationsModule, MaterialModule],
	exports: [
		HomeComponent,
		SignInComponent,
		RsvpComponent,
		VenueComponent,
		AccomodationsComponent,
		DietaryComponent,
		PlacesToEatComponent,
		RsvpFormComponent,
		GuestOverviewComponent,
		AddGuestComponent,
		AdminComponent,
		EditGuestComponent,
		DietaryOverviewComponent,
		ContactFormComponent,
		ThanksComponent
	]
})
export class PagesModule {}
