import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';



@Component({
	selector: 'app-bussiness',
	templateUrl: './bussiness.component.html',
	styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent implements OnInit {

	dataSource = new MatTableDataSource<SingleData>();
	data = [];
	year;
	month;
	leader;
	public years = ((start) => {
		let nowYear = (new Date()).getFullYear();
		const list = [];
		while (nowYear > start) list.push(nowYear--);
		return list;
	})(2015);

	public months = (() => {
		let month = 0;
		const list = [];
		while (month < 12) {
			month++;
			list.push(month < 10 ? `0${month}` : month)
		}
		return list;
	})();

	public loading: boolean = false;
	public status = '0';

	public policyType: any = '0';
	public keyWord: any = '';
	public page = 0;
	public pageSize = 10;
	public type = '0';
	public dataLength = 0;
	public info: any = {};
	public exportQs: any;
	public policyHolder: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	/**
	 * Set the paginator after the view init since this component will
	 * be able to query its view for the initialized paginator.
	 */
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	constructor(
		private appService: AppService,
		private _location: Location,
		public dialog: MatDialog,
		private route: ActivatedRoute, private router: Router
	) { }

	ngOnInit() {
		//this.queryData();
		//this.getPolicyLeader();
	}

	openDaySelect() {
		// if(!this.month) return alert('请先选择月份')
	}

	renderData(result) {
		this.loading = false;
		this.data = result.data;
		this.data.forEach((item) => {
			item.revenues = item.revenues.toFixed(2)
		})
	}

	async queryData() {
		this.data = [];
		this.loading = true;
		if (!this.year || !this.month) return alert('请选择正确的日期');
		const date = `${this.year}${this.month}`
		try {
			const result = await this.appService.findSubAgentData(date);
			this.renderData(result);
		} catch (e) {
			alert(e);
		}
	}

	async queryTotalData() {
		this.year = null;
		this.month = null;
		try {
			const result = await this.appService.findSubAgentData();
			this.renderData(result);
		} catch (e) {
			alert(e);
		}
	}

	exportData() {
		location.href = this.appService
			.getExportDataUri(
				(this.year && this.month) ?
					`${this.year}${this.month}` : null
			);
	}

	pageEvent(event) {
		console.log(event);
		this.page = event.pageIndex;
		this.pageSize = event.pageSize;
		if (this.year && this.month) return this.queryData();
		this.queryTotalData();
	}






}

export interface SingleData {
	code: string;
	name: string;
	businessName: string;
	roles: any;
	bFirstPrize: string;
	bSecondPrize: string;
	bOtherPrize: string;
	aFirstPrize: string;
	aSecondPrize: string;
	aOtherPrize: string;
	leaderName: string;
}
