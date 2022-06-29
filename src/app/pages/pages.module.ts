import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [HomeComponent, SignInComponent],
	imports: [CommonModule, FormsModule, MaterialModule],
	exports: [HomeComponent, SignInComponent]
})
export class PagesModule {}
