import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, style, animate, transition, query, keyframes, state } from '@angular/animations';

@Component({
	encapsulation: ViewEncapsulation.Emulated,
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
	// animations: [
	// 	trigger('exit', [
	//     transition(':enter', [style({ display: 'flex' })]),
	//     transition(':leave', [animate('1000ms ease-out', style({ display: 'none' }))])
	//   ]),
	// 	trigger('enter', [
	// 		transition(':enter', [animate('1000s', style({ display: 'none' }))], {delay: '2000ms'}),
	// 		transition(':leave', [animate('1000s ease-in', style({ display: 'flex' }))])
	// 	])
	// ]
})
export class HomeComponent implements OnInit, AfterViewInit {
	public redHeart: string = 'assets/img/heart_red.png';
	public photoHeart: string = 'assets/img/heart.png';

	public imageSource: string = this.redHeart;
	public hideRedHeart: boolean = false;
	public hideHeart: boolean = true;

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		// setTimeout(() => {
		// 	this.hideRedHeart = true;
		//   setTimeout(() => {
		//     this.hideHeart = false;
		//   }, 2000);
		// }, 3800);
	}
}
