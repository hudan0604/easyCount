import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthesisOfExpensesComponent } from './synthesis-of-expenses.component';

describe('SynthesisOfExpensesComponent', () => {
  let component: SynthesisOfExpensesComponent;
  let fixture: ComponentFixture<SynthesisOfExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynthesisOfExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthesisOfExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
