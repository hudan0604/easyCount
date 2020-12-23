import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsDropdownComponent } from './dashboards-dropdown.component';

describe('DashboardsDropdownComponent', () => {
  let component: DashboardsDropdownComponent;
  let fixture: ComponentFixture<DashboardsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
