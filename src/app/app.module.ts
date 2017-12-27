import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { SearchComponent } from './search/search.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DataService } from './shared/data.service';

import { LocalStorageModule } from 'angular-2-local-storage';
import { NgxPaginationModule } from 'ngx-pagination'; 

import { FormsModule } from '@angular/forms';
import { ModalViewComponent } from './modal-view/modal-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ListComponent,
    ListItemComponent,
    SearchComponent,
    ModalViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'app-rent',
      storageType: 'localStorage'
    }),
    NgxPaginationModule,
    BootstrapModalModule
  ],
  entryComponents: [
    ModalViewComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
