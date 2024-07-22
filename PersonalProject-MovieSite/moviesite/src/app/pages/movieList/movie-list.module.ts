import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MoviedetailComponent } from './moviedetail/moviedetail.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MovieDetailResolveService } from './resolver/movieDetailResolveService';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserRoleGuardService } from '../../core/routeGuards/userRoleGuard/user-role-guard.service';
import { MoviePostersResolveService } from './resolver/moviePostersResolverService';
import { MovieCastResolveService } from './resolver/movieCastResolverService';

const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
    children: [
      { path: 'movies', component: MoviesComponent },
      {
        path: 'movieDetail/:id', component: MoviedetailComponent,
        resolve: { movieDetail: MovieDetailResolveService, moviePosters: MoviePostersResolveService, movieCast: MovieCastResolveService },
        canActivate: [UserRoleGuardService]
      },
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [MovieListComponent, MoviesComponent, MovieItemComponent, MoviedetailComponent, VideoplayerComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    YouTubePlayerModule,
    MatProgressSpinnerModule
  ],
  providers: [MovieDetailResolveService, MoviePostersResolveService, MovieCastResolveService]
})
export class MovieListModule { }
