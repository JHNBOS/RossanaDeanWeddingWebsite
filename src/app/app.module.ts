import { PagesModule } from './pages/pages.module';
import { AuthenticationService } from './core/services/authentication.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/components/header/header.component';

import { AngularFireModule } from '@angular/fire/compat';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { GoogleMapsModule } from '@angular/google-maps'

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

// registerLocaleData(localeEn, 'en');

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		PagesModule,
		MaterialModule,
		HttpClientModule,
    GoogleMapsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideFirestore(() => getFirestore()),
		provideAuth(() => getAuth()),
		provideStorage(() => getStorage()),
		AngularFireModule.initializeApp(environment.firebaseConfig)
	],
	exports: [MaterialModule, GoogleMapsModule],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'en'
		},
		AuthenticationService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
