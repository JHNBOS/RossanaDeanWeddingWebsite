import { PagesModule } from './pages/pages.module';
import { AuthenticationService } from './core/services/authentication.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire/compat';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import localeEn from '@angular/common/locales/en';
import { RouterModule } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material.module';

registerLocaleData(localeEn, 'en');

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgbModule,
		PagesModule,
		MaterialModule,
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideFirestore(() => getFirestore()),
		provideAuth(() => getAuth()),
		provideStorage(() => getStorage()),
		AngularFireModule.initializeApp(environment.firebaseConfig)
	],
  exports: [
    MaterialModule
  ],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'nl'
		},
		AuthenticationService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
