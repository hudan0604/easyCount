import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsLayoutComponent } from './dashboards-layout.component';

describe('DashboardsLayoutComponent', () => {
  let component: DashboardsLayoutComponent;
  let fixture: ComponentFixture<DashboardsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
