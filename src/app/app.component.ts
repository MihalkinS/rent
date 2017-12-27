import { Component, Output, OnInit } from '@angular/core';
import { DataService } from '../app/shared/data.service';

import { Flat } from '../app/shared/flat';
import { Pagination } from '../app/shared/pagination';
import { Filter } from './shared/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private cities: string[] = [];

  private flats: Flat[] = []; // текущий список квартир/домов
  private pagination: Pagination = new Pagination();

  private searchString: string = ""; // строка поиска
  private page: number = 0; // номер текущей страницы
  private filter: Filter = new Filter(); // фильтр
  private enableFilter = false; // отключение фильтра при пустом списке

  private loading: boolean = false; // спинер загрузки
  private favoriteList: boolean = false; // true - отображаем список избранного, false - результат поиска
  private itemsPerPage: number = 20; 
  
  constructor(private service: DataService) {}

  ngOnInit() {
    this.enableFilter = false;
    this.service.getCities() // получаем названия испанских городов для автодополнения
      .subscribe(res => {
        this.cities = res as string[];
      });
  }

  // поиск города
  onSearch(str: string) {
    this.loading = true;
    this.flats = [];

    this.service.getFlatsList(str, this.filter)
      .subscribe(res => {
        this.flats = res["flats"];
        this.pagination = res["pagination"];
        this.searchString = str;
        this.page = (res["pagination"] as Pagination).page;

        this.loading = false;
        this.favoriteList = false;
        this.enableFilter = this.flats.length > 0 ? true : false;
      },
      err => {
        console.log("error");
        console.log(err);
      });
  }

  // при изменении страницы
  pageChanged(page: number) { // page - номер новой страницы
    this.page = page;
    this.loading = true;
    this.flats = [];

    if (!this.favoriteList) { // если отображаем не избранное
      this.service.getFlatsList(this.searchString, this.filter, this.page)
        .subscribe(res => {
          this.flats = res["flats"];
          this.pagination = res["pagination"];
          this.page = (res["pagination"] as Pagination).page;
          this.loading = false;
          this.enableFilter = this.flats.length > 0 ? true : false;
        },
        err => {
          console.log("error");
          console.log(err);
        });
    }
    else { // если избранное
      let res = this.service.showFavorites(this.itemsPerPage * (this.page - 1), this.itemsPerPage);
      this.flats = res["flats"];
      this.pagination = res["pagination"];
      this.pagination.page = page;
      this.loading = false;
    }
  }

  // использование фильтра
  applyFilter(filter: Filter) {
    this.filter = filter;
    this.loading = true;
    this.flats = [];
    this.service.getFlatsList(this.searchString, this.filter, this.page)
      .subscribe(res => {
        this.flats = res["flats"];
        this.pagination = res["pagination"];
        this.page = (res["pagination"] as Pagination).page;
        this.loading = false;
      },
      err => {
        console.log("error");
        console.log(err);
      });
  }

  // получение списка избранного
  onFavoriteList() {
    this.page = 0;
    if (this.pagination) this.pagination.clear();
    this.favoriteList = true;
    let res = this.service.showFavorites(this.itemsPerPage * this.page, this.itemsPerPage);

    this.flats = res["flats"];
    this.pagination = res["pagination"];
    this.pagination.page = ++this.page;
    this.loading = false;
    this.enableFilter = false;
  }

  // проверка содержиться ли в избранном
  favorite(flat: Flat) {
    this.service.setOrRemoveFavorite(flat);
  }

}
