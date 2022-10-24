import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { map } from 'rxjs';

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

	FormData: FormGroup;

	@ViewChild('contactForm') contactForm: NgForm;

	constructor(private builder: FormBuilder, public http: HttpClient) {}

	ngOnInit(): void {
		this.FormData = this.builder.group({
			Fullname: new FormControl('', [Validators.required]),
			Subject: new FormControl('', [Validators.required]),
			Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
			Message: new FormControl('', [Validators.required])
		});
	}

	public sendForm(): void {
		this.contactForm.ngSubmit.emit();
	}
}
