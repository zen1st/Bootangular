import { TestBed } from '@angular/core/testing';

import { RightSideNavService } from './right-side-nav.service';

describe('RightSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RightSideNavService = TestBed.get(RightSideNavService);
    expect(service).toBeTruthy();
  });
});
