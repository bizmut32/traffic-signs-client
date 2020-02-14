import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index/home/home.component';
import { IndexComponent } from './index/index.component';
import { PhotoComponentComponent } from './index/photo/photo.component';
import { TrainTestComponent } from './index/train-test/train-test.component';

const routes: Routes = [

  { path: 'app', component: PhotoComponentComponent },
  { path: '', component: IndexComponent, pathMatch: 'prefix', children: [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'train-test', component: TrainTestComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
