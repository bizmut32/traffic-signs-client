import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { PhotoComponentComponent } from './main/photo/photo.component';
import { TrainTestComponent } from './main/train-test/train-test.component';
import { GuessChartComponent } from './main/train-test/guess-chart/guess-chart.component';
import { NumberPipe } from './pipes/number.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneratorComponent } from './main/generator/generator.component';
import { ClassifiedImageComponent } from './main/train-test/classified-image/classified-image.component';
import { DetectionComponent } from './main/detection/detection.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MainComponent,
    PhotoComponentComponent,
    TrainTestComponent,
    GuessChartComponent,
    NumberPipe,
    LoadingComponent,
    GeneratorComponent,
    ClassifiedImageComponent,
    DetectionComponent
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
