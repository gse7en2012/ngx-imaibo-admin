import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { NgxEchartsModule } from 'ngx-echarts';
import { MyDatePickerModule } from 'mydatepicker';
import { MyOwnCustomMaterialModuleModule } from './my-own-custom-material-module/my-own-custom-material-module.module';
import { AppService } from './service/app.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';
import { ParentContainerComponent } from './parent-container/parent-container.component';
import { OpDataComponent } from './op-data/op-data.component';
import { OpDataTrendComponent } from './op-data-trend/op-data-trend.component';
import { OpDataCountComponent } from './op-data-count/op-data-count.component';
import { OpDataCountSingleComponent } from './op-data-count-single/op-data-count-single.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: 'admin', pathMatch: 'full' }
];

const adminRoutes: Routes = [
	{
		path: 'admin', component: ParentContainerComponent, children: [
			{ path: '', redirectTo: 'data', pathMatch: 'full' },
			//   { path: 'business', component: BussinessComponent, canActivate: [AuthGuard] },
			{
				path: 'data', component: OpDataComponent, children: [
					{ path: '', redirectTo: 'trend', pathMatch: 'full' },
					{ path: 'trend', component: OpDataTrendComponent },
					{ path: 'count', component: OpDataCountComponent },
					{ path: 'count/:uid', component: OpDataCountSingleComponent },
				]
			},
		]
	}
]


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ParentContainerComponent,
		OpDataComponent,
		OpDataTrendComponent,
		OpDataCountComponent,
		OpDataCountSingleComponent
	],
	imports: [
		BrowserModule,
		MyDatePickerModule,
		NgxEchartsModule,
		BrowserAnimationsModule,
		MyOwnCustomMaterialModuleModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		CookieModule.forRoot(),
		RouterModule.forRoot(routes),
		RouterModule.forChild(adminRoutes),
	],
	providers: [AppService, AuthGuard],
	entryComponents: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
