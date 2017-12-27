import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../shared/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() enableFilter;
  @Output() applyFilter = new EventEmitter<Filter>();
  private filter: Filter;

  constructor() { }

  ngOnInit() {
    this.filter = new Filter(true, 0, 1000000, 0, 10, true);
  }

  onApplyFilter() {
    this.applyFilter.emit(this.filter);
  }
}
