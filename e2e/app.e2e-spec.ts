import { NgxImaiboBussinessSysPage } from './app.po';

describe('ngx-imaibo-bussiness-sys App', () => {
  let page: NgxImaiboBussinessSysPage;

  beforeEach(() => {
    page = new NgxImaiboBussinessSysPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
