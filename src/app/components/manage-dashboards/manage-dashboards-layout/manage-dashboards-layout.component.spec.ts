import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDashboardsLayoutComponent } from './manage-dashboards-layout.component';

describe('ManageDashboardsLayoutComponent', () => {
  let component: ManageDashboardsLayoutComponent;
  let fixture: ComponentFixture<ManageDashboardsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDashboardsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDashboardsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
