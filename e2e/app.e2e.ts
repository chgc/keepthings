import { KeepthingsPage } from './app.po';

describe('keepthings App', function() {
  let page: KeepthingsPage;

  beforeEach(() => {
    page = new KeepthingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('keepthings works!');
  });
});
