import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToBalanceComponent } from './how-to-balance.component';

describe('HowToBalanceComponent', () => {
  let component: HowToBalanceComponent;
  let fixture: ComponentFixture<HowToBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
