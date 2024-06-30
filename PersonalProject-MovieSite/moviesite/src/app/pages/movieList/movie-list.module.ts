import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
    children: [
      { path: 'movies', component: MoviesComponent },
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [MovieListComponent, MoviesComponent, MovieItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MovieListModule { }
