import { TestBed } from '@angular/core/testing';

import { RetiroService } from './retiro.service';

describe('RetiroService', () => {
  let service: RetiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
