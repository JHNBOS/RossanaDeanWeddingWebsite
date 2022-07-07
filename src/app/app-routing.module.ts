import { TransportationComponent } from './pages/transportation/transportation.component';
import { ThingsToDoComponent } from './pages/things-to-do/things-to-do.component';
import { GuestbookComponent } from './pages/guestbook/guestbook.component';
import { DietaryComponent } from './pages/dietary/dietary.component';
import { VenueComponent } from './pages/venue/venue.component';
import { AccomodationsComponent } from './pages/accomodations/accomodations.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

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
		path: 'guestbook',
		component: GuestbookComponent,
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
