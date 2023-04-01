import { TestBed } from '@angular/core/testing';

import { GetLyricsService } from './get-lyrics.service';

describe('GetLyricsService', () => {
  let service: GetLyricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLyricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
