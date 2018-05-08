import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class AppService {

  constructor(private cookieService: CookieService, private http: Http) {

  }

  private baseUrl: string = '/ydt/api';
  // private cookieName = 'PARTNERTOKEN';
  private cookieName = 'ydt_partner_itoken';
  private cookieUserObjName = 'PARTNERINFO'

  private serviceUrl = {
    'login': '/ydt/api/bps/user/signIn',
    'query': '/ydt/api/bps/quotaPrize/record',
    'details': '/ydt/api/bps/quotaPrize/detail',
    'remark': '/ydt/api/bps/quotaPrize/saveRemark',
    'award': '/ydt/api/bps/quotaPrize/confirm',

    'policyList': '/ydt/api/bps/policy/findPolicy',
    'policyLeader': '/ydt/api/bps/user/findLeader',

    'roleList': '/ydt/api/bps/roleUser/findRole',
    'roleUserList': '/ydt/api/bps/roleUser/findRoleUser',
    'generatePolicyCode': '/ydt/api/bps/policy/generatePolicyCode',
    'generateRoleCode': '/ydt/api/bps/roleUser/generateRoleCode',

    'getBusinessCode': '/ydt/api/bps/business/findBusinessType',
    'addPolicy': '/ydt/api/bps/policy/addPolicy',
    'addNewRole': '/ydt/api/bps/roleUser/addRole',
    'findRoleType': '/ydt/api/bps/roleUser/findRoleType',
    'getPolicyListViaRoleId': '/ydt/api/bps/roleUser/findRolePolicy',

    'getRoleUserList': '/ydt/api/bps/roleUser/findUser',
    'editUserRole': '/ydt/api/bps/roleUser/updateRoleUser',
    'getUserRoleChangelog': '/ydt/api/bps/roleUser/roleUserModificationRecord',

    'findSubAgentData': '/ydt/api/partner/findSubagentData',

    //kol api
	'findMenus': '/ydt/api/mbbs/index/findMenuCodes',
	'kolAll':'/ydt/api/mbbs/kol/all',
	'kolCount':'/ydt/api/mbbs/kol/find',
	'kolOne':'/ydt/api/mbbs/kol/findOne'
  };


  generateHttpGetSearchParams(opts?: object) {
    const params: URLSearchParams = new URLSearchParams();
    if (opts) {
      Object.keys(opts).forEach((key) => {
        if (opts[key]) params.set(key, opts[key].toString());
      });
    }
    return { search: params, }
  }

  generateHttpPostSearchParams(opts) {
    const headers = new Headers({
      'content-type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });
    const postData = Object.keys(opts).map((k) => {
      return `${k}=${opts[k]}`;
    }).join('&');
    return {
      data: postData,
      opts: options
    }
  }


  gsevenRequestViaGet(target, opts?) {
    const uri = this.serviceUrl[target];
    const param = this.generateHttpGetSearchParams(opts);
    return this.http.get(`${uri}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }
  gsevenRequestViaDelete(target, opts) {
    const uri = this.serviceUrl[target];
    const param = this.generateHttpGetSearchParams(opts);
    return this.http.delete(`${uri}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      }).catch(e => alert(e))
  }
  gsevenRequestViaPost(target, opts) {
    const postData = this.generateHttpPostSearchParams(opts);
    return this.http.post(this.serviceUrl[target], postData.data, postData.opts).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }
  gsevenRequestViaPut(target, opts) {
    const postData = this.generateHttpPostSearchParams(opts);
    return this.http.put(this.serviceUrl[target], postData).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.statusCode === '200') {
          return data;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      }).catch(e => alert(e))
  }


  accountLogin(user, pass) {
    return this.gsevenRequestViaPost('login', {
      username: user,
      password: pass
    })
  }

  loginActionViaImaibo(username: string, pass: string): Promise<any> {
    const cookieExpires = new Date(Number(new Date()) + 1000 * 60 * 60 * 24 * 3);
    const loginParams = `password=${pass}&mobile=${username}`;
    const imaiboUri = `http://www.imaibo.net/index.php?app=csi&mod=YdtEtoroInfo&act=getImUid`;
    const options = new RequestOptions({
      headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' })
    });
    return this.http.post(imaiboUri, loginParams, options).toPromise()
      .then((data: any) => {
        const res = data.json();
        if (res.code !== 0) return Promise.reject(res.message);
        this.cookieService.put('ydt_partner_itoken', res.data.token);
        this.cookieService.put('ydt_partner_muid', res.data.uid);
        this.cookieService.putObject(this.cookieUserObjName, {
          head: res.data.face,
          nickname: res.data.nick_name,
          userId: res.data.uid
        }, { expires: cookieExpires });
        return Promise.resolve(res.data);
      });
  }

  loginViaMaiboUID(uid) {
    return this.http.get(`${this.baseUrl}/partner/findPolicy?mbUid=${uid}`).toPromise()
      .then(data => {
        const res = data.json();
        if (res.statusCode == 200) {
          return Promise.resolve(res);
        }
        return Promise.reject(res.msg);
      });
  }

  checkIsLogin() {
    return this.cookieService.get('BPSUSERTOKEN')
  }

  setMenuCookie(json){
	this.cookieService.putObject('im_kol_menu',json);
  }
  getMenuCookie(){
	return this.cookieService.getObject('im_kol_menu');
  }

  saveRemark(id, remark) {
    return this.gsevenRequestViaPost('remark', {
      id: id,
      remark: remark
    })
  }

  queryData(queryOpts) {
    return this.gsevenRequestViaGet('query', queryOpts)
  }

  getSendDetails(id) {
    return this.gsevenRequestViaGet('details', { id: id });
  }

  postExecuteAward(opts) {
    return this.gsevenRequestViaPost('award', opts);
  }

  getUserRoleList(opts) {
    return this.gsevenRequestViaGet('roleUserList', opts)
  }


  getPolicyList(opts) {
    return this.gsevenRequestViaGet('policyList', opts)
  }


  getPolicyLeader() {
    return this.gsevenRequestViaGet('policyLeader', {})
  }

  getRoleList(opts?) {
    return this.gsevenRequestViaGet('roleList', opts)
  }

  generatePolicyCode(type) {
    return this.gsevenRequestViaPost('generatePolicyCode', { type: type })
  }
  generateRoleCode(type) {
    return this.gsevenRequestViaPost('generateRoleCode', { type: type })
  }

  addPolicy(opts) {
    return this.gsevenRequestViaPost('addPolicy', opts);
  }
  addNewRole(opts) {
    return this.gsevenRequestViaPost('addNewRole', opts);
  }

  getBusinessCode() {
    return this.gsevenRequestViaGet('getBusinessCode', {});
  }

  getPolicyListViaRoleId(rId) {
    return this.gsevenRequestViaGet('getPolicyListViaRoleId', { roleId: rId })
  }


  getRoleUserList(opts) {
    return this.gsevenRequestViaGet('getRoleUserList', opts)
  }

  editUserRole(opts) {
    return this.gsevenRequestViaPost('editUserRole', opts)
  }

  getUserRoleChangeLog(uid) {
    return this.gsevenRequestViaGet('getUserRoleChangelog', { mbUid: uid })
  }

  findRoleType() {
    return this.gsevenRequestViaGet('findRoleType', {});
  }

  findSubAgentData(date?) {
    const token = this.cookieService.get('ydt_partner_itoken');
    const mbUid = this.cookieService.get('ydt_partner_muid');
    return this.gsevenRequestViaGet('findSubAgentData', {
      mbUid: mbUid,
      token: token,
      date: date
    })
  }
  getExportDataUri(date?) {
    const token = this.cookieService.get('ydt_partner_itoken');
    const mbUid = this.cookieService.get('ydt_partner_muid');
    let uri = `/ydt/api/partner/exportSubagentData?token=${token}&mbUid=${mbUid}`;
    if (date) {
      uri += '&date=' + date;
    }
    return uri;
  }


  //kol api start
  findUserMenus() {
    return this.gsevenRequestViaGet('findMenus');
  }

  getKolAllData(opts){
	return this.gsevenRequestViaGet('kolAll',opts);
  }

  getKolAllCount(opts){
	return this.gsevenRequestViaGet('kolCount',opts);
  }

  getKolOneCount(opts){
	  return this.gsevenRequestViaGet('kolOne',opts)
  }

}
