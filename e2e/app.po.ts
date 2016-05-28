export class KeepthingsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('keepthings-app h1')).getText();
  }
}
