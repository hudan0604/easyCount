import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchValue = new BehaviorSubject<string>('');

  constructor() { }

  setSearchValue(value: string) {
    console.log('set query value in service', value);
    this.searchValue.next(value);
  }

  getSearchValue(): Observable<string> {
    return this.searchValue.asObservable();
  }
}
