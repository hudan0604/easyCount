import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'easy-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  search = faSearch;
  searchForm: FormGroup;
  searchCtrl: FormControl;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
  ) { }

  initForm() {
    this.searchCtrl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchInput: this.searchCtrl
    });
    this.searchCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
      .subscribe((query: string) => {
        this.searchService.setSearchValue(query);
      });
  }

  ngOnInit() {
    this.initForm();
  }
}
