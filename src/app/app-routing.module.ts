import { ThanksComponent } from './pages/thanks/thanks.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { EditGuestComponent } from './pages/admin/edit-guest/edit-guest.component';
import { AdminComponent } from './pages/admin/admin.component';
import { GuestOverviewComponent } from './pages/admin/guest-overview/guest-overview.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { AccomodationsComponent } from './pages/accomodations/accomodations.component';
import { DietaryComponent } from './pages/dietary/dietary.component';
import { HomeComponent } from './pages/home/home.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { RsvpFormComponent } from './pages/rsvp/form/rsvp-form.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PlacesToEatComponent } from './pages/places-to-eat/places-to-eat.component';
import { VenueComponent } from './pages/venue/venue.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'rsvp',
		component: RsvpComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'rsvp-form',
		component: RsvpFormComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'venue',
		component: VenueComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'accomodations',
		component: AccomodationsComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'dietary',
		component: DietaryComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'places-to-eat',
		component: PlacesToEatComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'contact',
		component: ContactFormComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'thanks',
		component: ThanksComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'guest-overview',
		component: GuestOverviewComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'admin',
		canLoad: [AuthGuard],
		canActivate: [AuthGuard],
		component: AdminComponent
	},
	{
		path: 'guests/:id',
		component: EditGuestComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{ path: 'home', redirectTo: '', pathMatch: 'full' },
	{
		path: 'sign-in',
		component: SignInComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
