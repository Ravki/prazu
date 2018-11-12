import { TestBed } from '@angular/core/testing';

import { UpdateNavbarService } from './update-navbar.service';

describe('UpdateNavbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateNavbarService = TestBed.get(UpdateNavbarService);
    expect(service).toBeTruthy();
  });
});
