import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './index/home/home.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { PhotoComponentComponent } from './index/photo/photo.component';
import { TrainTestComponent } from './index/train-test/train-test.component';
import { GuessChartComponent } from './index/train-test/guess-chart/guess-chart.component';
import { NumberPipe } from './pipes/number.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    IndexComponent,
    PhotoComponentComponent,
    TrainTestComponent,
    GuessChartComponent,
    NumberPipe,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
