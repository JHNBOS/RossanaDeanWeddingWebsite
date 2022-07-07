import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { RsvpComponent } from './rsvp/rsvp.component';
import { VenueComponent } from './venue/venue.component';
import { AccomodationsComponent } from './accomodations/accomodations.component';
import { DietaryComponent } from './dietary/dietary.component';
import { ThingsToDoComponent } from './things-to-do/things-to-do.component';
import { TransportationComponent } from './transportation/transportation.component';
import { GuestbookComponent } from './guestbook/guestbook.component';

@NgModule({
	declarations: [HomeComponent, SignInComponent, RsvpComponent, VenueComponent, AccomodationsComponent, DietaryComponent, ThingsToDoComponent, TransportationComponent, GuestbookComponent],
	imports: [CommonModule, FormsModule, MaterialModule],
	exports: [HomeComponent, SignInComponent, RsvpComponent, VenueComponent, AccomodationsComponent, DietaryComponent, ThingsToDoComponent, TransportationComponent, GuestbookComponent]
})
export class PagesModule {}
