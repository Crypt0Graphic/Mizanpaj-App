import { MizanpajAppPage } from './app.po';

describe('mizanpaj-app App', function() {
  let page: MizanpajAppPage;

  beforeEach(() => {
    page = new MizanpajAppPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('mizanpaj-app works!');
  });
});
