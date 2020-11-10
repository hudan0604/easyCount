import { TestBed } from '@angular/core/testing';

import { OpenAnimationService } from './open-animation.service';

describe('OpenAnimationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenAnimationService = TestBed.get(OpenAnimationService);
    expect(service).toBeTruthy();
  });
});
