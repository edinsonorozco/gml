import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from "@angular/common/http";
import { ClientsModule } from './modules/clients/clients.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    ClientsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
