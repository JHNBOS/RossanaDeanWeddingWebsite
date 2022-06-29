import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router } from '@angular/router';
import { DataService } from './core/services/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	public cssClass: string = 'bg--primary';
	public hideMenu: boolean = true;

	constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService) {
		this.dataService.currentMessage.subscribe((data) => {
			if (data.length == null) {
				this.cssClass = '';
				this.hideMenu = false;
				return;
			}

			const message = JSON.parse(data);
			this.cssClass = message.cssClass;
			this.hideMenu = message.hideMenu;
		});
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {}
}
