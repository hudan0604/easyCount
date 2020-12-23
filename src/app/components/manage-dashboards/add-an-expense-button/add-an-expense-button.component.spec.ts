import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnExpenseButtonComponent } from './add-an-expense-button.component';

describe('AddAnExpenseButtonComponent', () => {
  let component: AddAnExpenseButtonComponent;
  let fixture: ComponentFixture<AddAnExpenseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnExpenseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnExpenseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
