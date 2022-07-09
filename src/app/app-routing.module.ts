import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { AccomodationsComponent } from './pages/accomodations/accomodations.component';
import { DietaryComponent } from './pages/dietary/dietary.component';
import { GuestbookComponent } from './pages/guestbook/guestbook.component';
import { HomeComponent } from './pages/home/home.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { RsvpFormComponent } from './pages/rsvp/form/rsvp-form.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ThingsToDoComponent } from './pages/things-to-do/things-to-do.component';
import { TransportationComponent } from './pages/transportation/transportation.component';
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
		path: 'things-to-do',
		component: ThingsToDoComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{
		path: 'transportation-to-venue',
		component: TransportationComponent,
		canLoad: [AuthGuard],
		canActivate: [AuthGuard]
	},
	{ path: 'home', redirectTo: '', pathMatch: 'full' },
	{
		path: 'sign-in',
		component: SignInComponent
	}
];

// const routes: Routes = [
// 	{ path: '', component: HomeComponent },
// 	{
// 		path: 'admin',
// 		canActivate: [AuthGuard],
// 		component: AdminComponent,
// 		children: [
// 			{
// 				path: 'pages',
// 				component: PageOverviewComponent
// 			},
// 			{
// 				path: 'pages/:id',
// 				component: PageEditComponent
// 			}
// 		]
// 	},
// 	{ path: 'view/:id', component: PageViewComponent },
// 	{ path: 'home', redirectTo: '', pathMatch: 'full' }
// ];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
