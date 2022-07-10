import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, style, animate, transition, query, keyframes, state } from '@angular/animations';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
	public redHeart: string = 'assets/img/heart_red.png';
	public photoHeart: string = 'assets/img/heart.png';

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
	}
}
