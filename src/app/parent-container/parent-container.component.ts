import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';
/** menu
 * "code": "00",
"text": "KOL运营数据",
"type": "1",                  // 一级

"code": "0000",
"text": "KOL整体趋势图",
"type": "2",                  // 二级

"code": "0001",
"text": "KOL数据统计",
"type": "2",                  // 二级
 */

@Component({
	selector: 'app-parent-container',
	templateUrl: './parent-container.component.html',
	styleUrls: ['./parent-container.component.scss']
})
export class ParentContainerComponent implements OnInit {

	public menuList: any = [];
	public minHeight: any = '1000px';

	public menuHash = {
		'00': {
			name: 'KOL运营数据',
			link: 'data'
		}
	}


	constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {

	}

	async ngOnInit() {
		this.setSideBarMinHeihgt();
		const data = await this.appService.findUserMenus();
		if (!data || data.statusCode != 200) {
			if (data.statusCode == 1010) {
				alert('请先登录');
				location.href = 'https://t-www.imaibo.net/adminlogin' + '?redirectUrl=' + encodeURIComponent(location.href);
			} else {
				alert(data.msg);
				location.href = 'https://t-www.imaibo.net/adminlogin' + '?redirectUrl=' + encodeURIComponent(location.href);
			}
		}
		// this.menuList = data.data;
		data.data.forEach(item => {
			if (this.menuHash[item]) this.menuList.push(this.menuHash[item]);
		})
		this.appService.setMenuCookie(data);
		// this.router.navigate(['./trend'], { relativeTo: this.route });
	}

	setSideBarMinHeihgt() {
		this.minHeight = window.innerHeight - document.querySelector('.header')['offsetHeight'] + 'px';
	}

}
