import { TestBed } from '@angular/core/testing';

import { GloomhavenService } from './gloomhaven.service';

describe('GloomhavenService', () => {
  let service: GloomhavenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloomhavenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
