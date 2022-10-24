import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
	public subject: string = '';
	public message: string = '';
	public fullName: string = '';
	public email: string = '';

	@ViewChild('contactForm') contactForm: NgForm;

	constructor() {}

	ngOnInit(): void {}

	public sendForm(): void {
		this.contactForm.ngSubmit.emit();
	}
}
