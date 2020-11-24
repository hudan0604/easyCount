import { TestBed } from '@angular/core/testing';

import { DashboardsService } from './dashboards.service';

describe('DashboardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardsService = TestBed.get(DashboardsService);
    expect(service).toBeTruthy();
  });
});
