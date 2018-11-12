import { TestBed } from '@angular/core/testing';

import { RunTestsService } from './run-tests.service';

describe('RunTestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunTestsService = TestBed.get(RunTestsService);
    expect(service).toBeTruthy();
  });
});
