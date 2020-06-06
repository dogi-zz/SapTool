import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTableModule } from './edit-table/edit-table.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,


    EditTableModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
