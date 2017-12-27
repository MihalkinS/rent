import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flat } from '../shared/flat';
import { Pagination } from '../shared/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() flats: Flat[] = [];
  @Input() loading: boolean = true; // спинер загрузки
  @Input() pagination: Pagination;

  @Output() favorite = new EventEmitter<Flat>();
  @Output() show = new EventEmitter<Flat>();
  @Output() pageChanged = new EventEmitter<number>();


  constructor() {}

  onShow(flat: Flat) {
    this.show.emit(flat);
  }
  
  // событие при нажатии на звезду
  onFavorite(flat: Flat) {
    this.favorite.emit(flat);
  }

  onPageChange(numb: any) {
    this.pageChanged.emit(numb);
  }
}
