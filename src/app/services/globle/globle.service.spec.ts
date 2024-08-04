import { TestBed } from '@angular/core/testing';

import { GlobleService } from './globle.service';

describe('GlobleService', () => {
  let service: GlobleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
