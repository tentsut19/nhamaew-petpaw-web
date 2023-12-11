import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IntentsDetailComponent } from './detail.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  PaginationModule
} from '../../common-components/pagination/pagination.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import {
  ScrollToTopModule
} from '../../scroll-to-top/scroll-to-top.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule,
    PaginationModule,
    Daterangepicker,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ScrollToTopModule,
    FormsModule
  ],
  declarations: [IntentsDetailComponent],
  exports: [
    IntentsDetailComponent
  ],
  providers: [
    NgxSpinnerService
  ]
})
export class IntentsDetailModule { }
