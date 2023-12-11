import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollToTopComponent } from './scroll-to-top.component';
 

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ScrollToTopComponent],
  exports: [
    ScrollToTopComponent
  ],
  providers: [ 
  ]
})
export class ScrollToTopModule { }
