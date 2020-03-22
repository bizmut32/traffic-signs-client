import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { PhotoComponentComponent } from './main/photo/photo.component';
import { TrainTestComponent } from './main/train-test/train-test.component';
import { GeneratorComponent } from './main/generator/generator.component';

const routes: Routes = [

  { path: 'app', component: PhotoComponentComponent },
  { path: '', component: MainComponent, pathMatch: 'prefix', children: [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'train-test', component: TrainTestComponent },
    { path: 'generator', component: GeneratorComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
