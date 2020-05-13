import { TestBed } from '@angular/core/testing';

import { LeftSideNavService } from './left-side-nav.service';

describe('LeftSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeftSideNavService = TestBed.get(LeftSideNavService);
    expect(service).toBeTruthy();
  });
});
