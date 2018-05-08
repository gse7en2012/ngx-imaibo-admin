import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
declare var moment;

@Component({
	selector: 'app-op-data-count',
	templateUrl: './op-data-count.component.html',
	styleUrls: ['./op-data-count.component.scss']
})
export class OpDataCountComponent implements OnInit {
	public defaultDays = 7;
	public loading: boolean = false;
	public noChartData: boolean = false;
	public keyWord: string;
	public details: any = [];
	public query: any = {
		date: 'd7',
		page: 1,
		pageSize: 10,
		type: 'd',
	}
	public myDatePickerOptions: IMyDpOptions = {
		dateFormat: 'yyyy-mm-dd',
		width: '140px',
		height: '26px',
		markCurrentDay: true,
		openSelectorOnInputClick: true,
		inline: false,
		editableDateField: false
	};
	public startTime: any;
	public endTime: any;
	public startTimeFormat: string;
	public endTimeFormat: string;
	public dataLength = 0;


	public info: any = {};
	public count: any = {};

	public chartOpts = {

	};


	constructor(private appService: AppService) { }

	ngOnInit() {

		// this.getData();
		this.initTime(this.defaultDays);
		this.getData();
	}

	async getData() {
		this.query.sDate = this.startTimeFormat.split(' ')[0];
		this.query.eDate = this.endTimeFormat.split(' ')[0];
		if (this.keyWord) {
			if (isNaN(Number(this.keyWord))) {
				this.query.uname = this.keyWord;
			} else {
				this.query.uid = this.keyWord;
			}
		} else {
			this.query.uid = this.query.uname = null;
		}

		this.loading = true;
		const data = await this.appService.getKolAllCount(this.query);
		this.loading = false;
		this.dataLength = data.data.totalRows;
		this.count = data.data.total;
		this.count.incomeValue = this.convertMoney(this.count.incomeValue);
		this.details = data.data.details;
		this.details.forEach((item) => {
			item.incomeValue = this.convertMoney(item.incomeValue)
		})
	}


	pageEvent(event) {
		this.query.page = event.pageIndex + 1;
		this.query.pageSize = event.pageSize;
		this.getData();
	}


	onSDateChanged(event: IMyDateModel) {
		// event properties are: event.date, event.jsdate, event.formatted and event.epoc
		this.startTimeFormat = event.formatted;
	}
	onEDateChanged(event: IMyDateModel) {
		// event properties are: event.date, event.jsdate, event.formatted and event.epoc
		this.endTimeFormat = event.formatted;
	}
	chooseType(type) {
		this.query.type = type;
		this.getData();
	}

	chooseDay(t) {
		this.query.date = t;
		const h = {
			'd7': 7, 'm1': 30, 'm2': 60
		}
		this.initTime(h[t]);
		this.getData();
	}
	initTime(diff) {
		const nowTime = moment();
		const pastTime = moment().add(-diff, 'd');
		this.endTime = {
			date: {
				year: nowTime.year(),
				month: nowTime.month() + 1,
				day: nowTime.date(),
			}
		}
		this.endTimeFormat = nowTime.format('YYYY-MM-DD HH:mm:ss');
		this.startTimeFormat = pastTime.format('YYYY-MM-DD HH:mm:ss');
		this.startTime = {
			date: {
				year: pastTime.year(),
				month: pastTime.month() + 1,
				day: pastTime.date(),
			}
		}
	}


	convertMoney(m) {
		if (!m) return 0;
		const list = m.toString().split('').reverse();
		return list.map((item, index) => {
			if (index % 3 == 0 && index !== 0) return [item, ','].join('');
			return item;
		}).reverse().join('')
	}



	exportData() {
		let uri = `/ydt/api/mbbs/kol/export?date=${this.query.date}&sDate=${this.startTimeFormat.split(' ')[0]}&eDate=${this.endTimeFormat.split(' ')[0]}&type=${this.query.type}`;
		if (this.keyWord) {
			if (isNaN(Number(this.keyWord))) {
				uri+=`&uname=${this.keyWord}`;
			} else {
				uri+=`&uid=${this.keyWord}`;
			}
		}
		console.log(uri);
		location.href = uri;
	}
}
