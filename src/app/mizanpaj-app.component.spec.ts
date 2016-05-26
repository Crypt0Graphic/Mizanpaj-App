import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { MizanpajAppAppComponent } from '../app/mizanpaj-app.component';

beforeEachProviders(() => [MizanpajAppAppComponent]);

describe('App: MizanpajApp', () => {
  it('should create the app',
      inject([MizanpajAppAppComponent], (app: MizanpajAppAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'mizanpaj-app works!\'',
      inject([MizanpajAppAppComponent], (app: MizanpajAppAppComponent) => {
    expect(app.title).toEqual('mizanpaj-app works!');
  }));
});
