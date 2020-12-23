import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-add-an-expense-button',
  templateUrl: './add-an-expense-button.component.html',
  styleUrls: ['./add-an-expense-button.component.scss']
})
export class AddAnExpenseButtonComponent {

  addExpenseIcon = faFeatherAlt;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  goToExpenseForm() {
    this.router.navigate(['add-expense'], { relativeTo: this.route });
  }
}
