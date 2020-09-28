import { TestBed } from '@angular/core/testing';

import { AuthenticacionService } from './authenticacion.service';

describe('AuthenticacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticacionService = TestBed.get(AuthenticacionService);
    expect(service).toBeTruthy();
  });
});
