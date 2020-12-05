import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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

  toggleCheck(): void {
    this.checked = !this.checked;
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
