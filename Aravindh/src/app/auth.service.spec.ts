import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './AuthGuard.service';

describe('AuthService', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
