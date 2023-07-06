import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppComponent } from './app.component';
import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { MessageModule } from "./messages/message.module";
import { MessageComponent } from "./messages/message.component";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'

@NgModule({
  declarations: [],
  imports: [BrowserModule, ModelModule, CoreModule, MessageModule,CommonModule, BrowserAnimationsModule,
    MatDatepickerModule,MatNativeDateModule 
  ],
  providers: [],
  bootstrap: [TableComponent, FormComponent, MessageComponent]
  
})
export class AppModule { }