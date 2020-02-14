import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './index/home/home.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { PhotoComponentComponent } from './index/photo/photo.component';
import { TrainTestComponent } from './index/train-test/train-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    IndexComponent,
    PhotoComponentComponent,
    TrainTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
