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
		canActivate: [AuthGuard],
	},
	{ path: 'home', redirectTo: '', pathMatch: 'full' },
	{
		path: 'sign-in',
		component: SignInComponent,
    canLoad: [AuthGuard],
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
