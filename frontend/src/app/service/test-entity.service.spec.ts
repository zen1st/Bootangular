import { TestBed } from '@angular/core/testing';

import { TestEntityService } from './test-entity.service';

describe('TestEntityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestEntityService = TestBed.get(TestEntityService);
    expect(service).toBeTruthy();
  });
});
