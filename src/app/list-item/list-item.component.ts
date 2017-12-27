import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flat } from '../shared/flat';
import { DialogService } from "ng2-bootstrap-modal";
import { ModalViewComponent } from '../modal-view/modal-view.component';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

  @Input() flat: Flat;
  @Output() onFavorite = new EventEmitter<Flat>();
  
  favorite: boolean = false;

  constructor(private dialogService: DialogService) { }

  // показать modal view
  show() {
    let disposable = this.dialogService.addDialog(ModalViewComponent, {
      title: this.flat.title, 
      price_formatted: this.flat.price_formatted,
      bedroom_number: this.flat.bedroom_number,
      bathroom_number: this.flat.bathroom_number,
      floor: this.flat.floor,
      car_spaces: this.flat.car_spaces,
      property_type: this.flat.property_type == "house" ? "Дом" : "Квартира",
      lister_url: this.flat.lister_url,
      img_url: this.flat.img_url
     });
  }

  // добавление/удалении из избранного
  toggleFavorite() {
    this.onFavorite.emit(this.flat);
  }
}
