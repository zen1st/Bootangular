import { TestBed } from '@angular/core/testing';

import { ChatRomService } from './chat-rom.service';

describe('ChatRomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatRomService = TestBed.get(ChatRomService);
    expect(service).toBeTruthy();
  });
});
