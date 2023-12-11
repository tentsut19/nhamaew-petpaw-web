import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConsultVeterinarianComponent } from './consult-veterinarian.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  PaginationModule
} from '../common-components/pagination/pagination.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

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
    FormsModule
  ],
  declarations: [ConsultVeterinarianComponent],
  exports: [
    ConsultVeterinarianComponent
  ],
  providers: [
    NgxSpinnerService
  ]
})
export class ConsultVeterinarianModule { }
