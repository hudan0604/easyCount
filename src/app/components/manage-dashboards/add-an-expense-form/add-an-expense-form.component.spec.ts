import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnExpenseFormComponent } from './add-an-expense-form.component';

describe('AddAnExpenseFormComponent', () => {
  let component: AddAnExpenseFormComponent;
  let fixture: ComponentFixture<AddAnExpenseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnExpenseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
