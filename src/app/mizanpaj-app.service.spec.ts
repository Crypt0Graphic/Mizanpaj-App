import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { MizanpajAppService } from './mizanpaj-app.service';

describe('MizanpajApp Service', () => {
  beforeEachProviders(() => [MizanpajAppService]);

  it('should ...',
      inject([MizanpajAppService], (service: MizanpajAppService) => {
    expect(service).toBeTruthy();
  }));
});
