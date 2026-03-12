import { TestBed } from '@angular/core/testing';

import { IptvService } from './iptv.service';

describe('IptvService', () => {
  let service: IptvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IptvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
