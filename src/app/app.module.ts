import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { MyOwnCustomMaterialModuleModule } from './my-own-custom-material-module/my-own-custom-material-module.module';
import { AppService } from './service/app.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';
import { ParentContainerComponent } from './parent-container/parent-container.component';
import { BussinessComponent } from './bussiness/bussiness.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

const adminRoutes: Routes = [
  {
    path: 'admin', component: ParentContainerComponent, children: [
      { path: '', redirectTo: 'business', pathMatch: 'full' },
      { path: 'business', component: BussinessComponent, canActivate: [AuthGuard] },
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentContainerComponent,
    BussinessComponent
  ],
  imports: [
    BrowserModule,
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
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
