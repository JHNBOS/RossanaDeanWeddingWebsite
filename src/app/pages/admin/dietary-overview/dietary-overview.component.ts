import { IDietaryForm } from './../../../core/models/dietary.model';
import { DietaryService } from './../../../core/services/dietary.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dietary-overview',
	templateUrl: './dietary-overview.component.html',
	styleUrls: ['./dietary-overview.component.scss']
})
export class DietaryOverviewComponent implements OnInit {
	public readonly displayedColumns: string[] = ['position', 'name', 'restrictions', 'description', 'actions'];

	public diets: Array<IDietaryForm> = [];
	public dataSource!: MatTableDataSource<IDietaryForm>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public router: Router, private service: DietaryService) {}

	async ngOnInit(): Promise<void> {
		await this.loadData();

		this.dataSource = new MatTableDataSource(this.diets);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	public async loadData(): Promise<void> {
		this.diets = await this.service.list();
	}

	ngAfterViewInit() {}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	public async delete(diet: IDietaryForm): Promise<void> {
		if (confirm('Are you sure you want to delete this?') === false) return;
		await this.service.delete(diet.id);

		await this.loadData();
		this.dataSource.data = this.diets;
	}
}
