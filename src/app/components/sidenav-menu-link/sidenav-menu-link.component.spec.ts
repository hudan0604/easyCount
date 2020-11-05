import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenuLinkComponent } from './sidenav-menu-link.component';

describe('SidenavMenuLinkComponent', () => {
  let component: SidenavMenuLinkComponent;
  let fixture: ComponentFixture<SidenavMenuLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMenuLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
