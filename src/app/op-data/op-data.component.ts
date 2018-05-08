import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';


@Component({
	selector: 'app-op-data',
	templateUrl: './op-data.component.html',
	styleUrls: ['./op-data.component.scss']
})
export class OpDataComponent implements OnInit {

	public menuHash = {
		'0000': {
			name: 'KOL整体趋势图',
			link: 'trend'
		},
		'0001': {
			name: 'KOL数据统计',
			link: 'count'
		}
	}


	navLinks: any = []


	constructor(private appService: AppService) { }

	ngOnInit() {
		const data: any = this.appService.getMenuCookie();
		data.data.forEach(item => {
			if (this.menuHash[item]) this.navLinks.push(this.menuHash[item]);
		})
	}

}
