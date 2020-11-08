import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsSearchComponent } from './dashboards-search.component';

describe('DashboardsSearchComponent', () => {
  let component: DashboardsSearchComponent;
  let fixture: ComponentFixture<DashboardsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
