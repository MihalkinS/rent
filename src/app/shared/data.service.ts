import { Flat } from '../shared/flat';
import { Filter } from '../shared/filter';
import { Pagination } from '../shared/pagination';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http'

import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorageService } from 'angular-2-local-storage';



@Injectable()
export class DataService {

  //private apiURL: string = 'https://api.nestoria.co.uk/api';
  private apiURL: string = 'https://api.nestoria.es/api';

  // получаем список городов Испании
  getCities() {
    return this.http.get('assets/cities.json')
                    .map(response => response["cities"]);

  }

  constructor(private http: HttpClient,
    private storage: LocalStorageService) {}

// получаем список квартир
getFlatsList(place_name: string, filter: Filter, page?: number) {
    if(!place_name) return new EmptyObservable();

    let listingType = filter.toRent? "rent" : "buy";
    let hasPhoto = filter.has_photo ? "1" : "0";

    let requestUrl = `${this.apiURL}?callback=JSONP_CALLBACK&encoding=json&action=search_listings&pretty=1&number_of_results=20`;
    requestUrl = requestUrl + `&listing_type=${listingType}&place_name=${place_name}`;

    if(filter.price_min >= 0) requestUrl = requestUrl.concat(`&price_min=${filter.price_min}`);
    if(filter.price_max >= 0 && (filter.price_min < filter.price_max)) requestUrl = requestUrl.concat(`&price_max=${filter.price_max}`);
    if(filter.bedroom_min >= 0) requestUrl = requestUrl.concat(`&bedroom_min=${filter.bedroom_min}`);
    if(filter.bedroom_max >= 0 && (filter.bedroom_min < filter.bedroom_max)) requestUrl = requestUrl.concat(`&bedroom_max=${filter.bedroom_max}`);
    if(filter.sorting_type != "") requestUrl = requestUrl.concat(`&sort=${filter.sorting_type}`);
    if(page) requestUrl = requestUrl.concat(`&page=${page}`);

    return this.http.jsonp(requestUrl, 'callback')
      .map(response => {
        let list = response["response"]["listings"];
        let pagination = new Pagination(response["response"]["page"],
                                        response["response"]["total_pages"],
                                        response["response"]["total_results"]);

        let result = {};
        result["flats"] = list.map(item => {
          let favorite = this.isFavorite(item.title); //проверяем есть ли в избранном

          return new Flat(
            item.bedroom_number,
            item.bathroom_number,
            item.floor,
            item.car_spaces,
            item.img_url,
            item.lister_url,
            item.price,
            item.property_type,
            item.summary,
            item.title,
            item.thumb_url,
            item.price_formatted,
            item.updated_in_days_formatted,
            favorite);
        });

        result["pagination"] = pagination;
        return result;
      })
      .catch(this.handleError);
  }

  // обработка ошибок
  handleError(error: any) {
    console.error("Ошибка", error);
    return Observable.throw(error || error.message);
  }

  // помещаем или извлекаем в/из избранного
  setOrRemoveFavorite(flat: Flat) {
    let value = this.storage.get(flat.title);
    flat.favorite = !flat.favorite;
    if (!value) {
      this.storage.set(flat.title, flat);
    }
    else {
      this.storage.remove(flat.title);
    }

  }

  // проверяем является ли избранным
  isFavorite(title: string) {
    let value = this.storage.get(title);
    if (value) return true;
    return false;
  }

  // получаем список избранных элементов
  showFavorites(offset: number = 0, count: number) {
    let keys = this.storage.keys();
    let edge = 0;

    if(keys.length < (offset + count)) edge = keys.length; // если в избранном осталось меньше, чем отображаемых на странице
    else edge = offset + count;

    let flats: Flat[] = [];
    for (let i = offset; i < edge; i++) {
      flats.push(this.storage.get(keys[i]));
    }

    let pagesCount; // количество страниц в избранном
    if(count) pagesCount = Math.ceil(keys.length / count);

    let result = {};
    result["flats"] = flats;
    result["pagination"] = new Pagination(0, pagesCount, keys.length);

    return result;
  }
}