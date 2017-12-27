import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ModalModel {
  title: string;
  img_url: string;
  bedroom_number: number;
  bathroom_number: number;
  floor: number;
  car_spaces: number;
  property_type: string;
  lister_url: string;
  price_formatted: string;
}

@Component({
  selector: 'modalview',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.css']
})

export class ModalViewComponent extends DialogComponent<ModalModel, boolean> implements ModalModel {
  title: string;
  img_url: string;
  bedroom_number: number;
  bathroom_number: number;
  floor: number;
  car_spaces: number;
  property_type: string;
  lister_url: string;
  price_formatted: string;

  constructor(dialogService: DialogService) { 
    super(dialogService);
  }
  
  modalview() {
    this.result = true;
    this.close();
  }

}


