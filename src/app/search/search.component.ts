import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() cities: string[];
  @Output() onSearch = new EventEmitter<string>();
  @Output() onFavoriteList = new EventEmitter();

  private searchstring: string;
  private searchBtnVisiability: string = "hidden"; // скрываем кнопку поиска
  
  constructor() {}

  search() {
    this.onSearch.emit(this.searchstring);

    this.searchBtnVisiability = "hidden"; // скрываем кнопку поиска
    this.searchstring = "";
  }

  favorite() {
    this.onFavoriteList.emit();
  }

  onSearchChange(searchValue : string) {
    if(searchValue != "") this.searchBtnVisiability = "visible"; // показываем кнопку поиска
    else this.searchBtnVisiability = "hidden"; // скрываем кнопку поиска
  }
}
