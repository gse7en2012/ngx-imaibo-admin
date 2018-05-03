import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import { AuthService } from './auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class ExtendedHttpService extends Http {
  private apiVersion = '1.1';
  defaultHeaders = new Headers({
    'version': this.apiVersion
  })

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private router: Router,
    // private authService: AuthService
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //do whatever     
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: this.defaultHeaders };
      } else {
        options.headers.set('version', this.apiVersion);
      }
      this.setHeaders(options);
    } else {
      url.headers.set('version', this.apiVersion);
      this.setHeaders(url);
    }
    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {

    const errMsg = {
      '400': '参数错误',
      '401': '没有权限',
      '444': '鉴权失败，请重新登录',
      '445': '请重新登录',
      '500': '服务器错误'
    }

    return (res: Response) => {
      try {
        const body = JSON.parse(res['_body']);
        if (res.status === 401 || res.status === 444 || res.status === 445) {
          //handle authorization errors
          //in this example I am navigating to logout route which brings the login screen
          // alert(errMsg[res.status]);
          // console.log(body.msg);
          this.router.navigate(['/login'],{ queryParams: { forbbiden: 1 } });
          return Observable.of(res);
        }
        return Observable.throw(body.msg);
      } catch (e) {
        return Observable.throw('返回数据的格式错误');
      }

    };
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    //add whatever header that you need to every request
    //in this example I add header token by using authService that I've created
    // objectToSetHeadersTo.headers.set('Token', this.authService.getToken());
  }
}