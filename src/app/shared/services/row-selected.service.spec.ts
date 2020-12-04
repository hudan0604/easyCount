import { TestBed } from '@angular/core/testing';

import { RowSelectedService } from './row-selected.service';

describe('RowSelectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RowSelectedService = TestBed.get(RowSelectedService);
    expect(service).toBeTruthy();
  });
});
