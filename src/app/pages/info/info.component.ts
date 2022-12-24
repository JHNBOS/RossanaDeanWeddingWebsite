import { AfterViewInit } from '@angular/core';
// <reference types="@types/google.maps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, AfterViewInit {
	@ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

	public mapZoom: number = 15;
	public mapCenter: google.maps.LatLngLiteral = {
		lat: 51.32304604630722,
		lng: 4.950825369325472
	};

	public marker: google.maps.Marker;

	public mapOptions: google.maps.MapOptions = {
		mapTypeId: 'roadmap',
		zoomControl: true,
		scrollwheel: true,
		disableDoubleClickZoom: true,
		maxZoom: 20,
		minZoom: 8
	};

	constructor() {}

	ngOnInit(): void {
		this.marker = new google.maps.Marker({
			position: this.mapCenter,
			label: '',
			title: '',
      animation: google.maps.Animation.DROP
		});
	}

	public onMapLoaded(map: google.maps.Map): void {}

	ngAfterViewInit(): void {}
}
