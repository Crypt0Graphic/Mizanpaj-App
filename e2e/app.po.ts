export class MizanpajAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('mizanpaj-app-app h1')).getText();
  }
}
