import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input('hide') hide: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService) {

	}

	ngOnInit(): void {}
}
