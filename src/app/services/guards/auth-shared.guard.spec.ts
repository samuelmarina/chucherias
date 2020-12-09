import { TestBed } from '@angular/core/testing';

import { AuthSharedGuard } from './auth-shared.guard';

describe('AuthSharedGuard', () => {
  let guard: AuthSharedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSharedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
