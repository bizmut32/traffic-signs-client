import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index/home/home.component';
import { IndexComponent } from './index/index.component';
import { PhotoComponentComponent } from './index/photo/photo.component';

const routes: Routes = [
  { path: '', component: IndexComponent, children: [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'app', component: PhotoComponentComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
