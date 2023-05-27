import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BeachModelComponent } from './beach-model/beach-model.component';
import { GardenModelComponent } from './garden-model/garden-model.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    BeachModelComponent,
    GardenModelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
