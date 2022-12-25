import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { markTimeline } from 'console';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, AfterViewInit {
	@ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
	@ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

	public mapZoom: number = 13;

	public centerPosition: google.maps.LatLngLiteral = {
		lat: 51.31485268187664,
		lng: 4.989035077575983
	};

	public hotelPosition: google.maps.LatLng = new google.maps.LatLng({
		lat: 51.32304604630722,
		lng: 4.950825369325472
	});

	public venuePosition: google.maps.LatLng = new google.maps.LatLng({
		lat: 51.31023875264583,
		lng: 5.024826474643172
	});

	public hotelMarker!: google.maps.Marker;
	public venueMarker!: google.maps.Marker;

	public infoContent: string = '';

	public mapOptions: google.maps.MapOptions = {
		mapTypeId: 'roadmap',
		zoomControl: true,
		scrollwheel: true,
		disableDoubleClickZoom: true,
		maxZoom: 20,
		minZoom: 8
	};

	constructor(public translate: TranslateService) {}

	ngOnInit(): void {
		this.hotelMarker = new google.maps.Marker({
			position: this.hotelPosition,
			label: 'A',
			title: 'Corsendonk Turnova',
			icon: 'https://maps.google.com/mapfiles/ms/micons/green-dot.png',
			animation: google.maps.Animation.DROP
		});

		this.venueMarker = new google.maps.Marker({
			position: this.venuePosition,
			label: 'B',
			title: 'Alta Ripa',
			icon: 'https://maps.google.com/mapfiles/ms/micons/yellow-dot.png',
			animation: google.maps.Animation.DROP
		});
	}

	public openInfoWindow(marker: MapMarker): void {
		this.infoContent = this.getMarkerInfo(marker);
		this.infoWindow.open(marker);
	}

	private getMarkerInfo(marker: MapMarker): string {
		let content = '';

		if (marker.getPosition()! == this.hotelPosition) {
			this.translate.get('info.pickup-blog.locations.pickup').subscribe((v: string) => (content = v));
		}
		if (marker.getPosition()! == this.venuePosition) {
			this.translate.get('info.pickup-blog.locations.venue').subscribe((v: string) => (content = v));
		}

		return `
<div id="infoContent" class="p-2">
  <h3 class="mb-1 fw-bold">${marker.getTitle()}</h3>
  <p>
    ${content}
  </p>
</div>
    `;
	}

	ngAfterViewInit(): void {}
}
