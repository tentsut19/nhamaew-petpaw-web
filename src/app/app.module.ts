import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OrgChartModule } from 'ng2-org-chart';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {
  HeaderComponent,
  MenuLeftComponent,
  LoginInitComponent,
  FooterComponent
} from './shared';

import { Constant } from './shared/constant';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyGalleryModule } from 'angular-gallery';
import { ChartsModule } from 'ng2-charts';
import { IntentsModule } from './intents/intents.module';
import { IntentsDetailModule } from './intents/detail/detail.module';
import { ConsultVeterinarianModule } from './consult-veterinarian/consult-veterinarian.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuLeftComponent,
    FooterComponent,
    LoginInitComponent
  ],
  imports: [
    IvyGalleryModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OrgChartModule,
    RouterModule,
    BrowserAnimationsModule,
    ChartsModule,
    IntentsModule,
    IntentsDetailModule,
    ConsultVeterinarianModule,
  ],
  exports: [
    
  ],
  providers: [
    Constant
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
