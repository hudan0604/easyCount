import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDashboardSelectedComponent } from './no-dashboard-selected.component';

describe('NoDashboardSelectedComponent', () => {
  let component: NoDashboardSelectedComponent;
  let fixture: ComponentFixture<NoDashboardSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDashboardSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDashboardSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
