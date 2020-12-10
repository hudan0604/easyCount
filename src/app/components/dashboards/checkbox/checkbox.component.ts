import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnChanges {
  checked = false;
  check = faCheck;
  @Input() unCheckCheckbox: boolean;
  @Output() checkboxClickedHighlightRow = new EventEmitter<boolean>();

  constructor(
    private router: Router,
  ) {}

  toggleCheck(): void {
    this.checked = !this.checked;
    if (window.location.pathname.includes('view')) {
      this.router.navigate(['/dashboards']);
    }
    this.checkboxClickedHighlightRow.emit(this.checked);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.unCheckCheckbox.previousValue === undefined) {
      this.checked = false;
    }
    if (changes.unCheckCheckbox.currentValue || !changes.unCheckCheckbox.currentValue) {
      this.checked = false;
    }
  }
}
