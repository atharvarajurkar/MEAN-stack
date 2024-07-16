import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieService } from '../../../core/services/movieService/movie.service';
import { MovieDetail } from '../../../shared/interfaces/moviedetail';
import { MatDialog } from '@angular/material/dialog';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';
import { AuthService } from '../../../core/services/auth.service';
import { MovieItemComponent } from '../movie-item/movie-item.component';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrl: './moviedetail.component.scss'
})
export class MoviedetailComponent implements OnInit {
  private movieBackgroundURL = "https://image.tmdb.org/t/p/w500"
  private videoURL = "https://www.youtube.com/watch?v=h6hZkvrFIj0"
  movieDetail!: MovieDetail
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService, private matDialog: MatDialog,
    private authService: AuthService
  ){}
  ngOnInit() {
    this.authService.loading$.next(false)
    this.movieDetail = this.activatedRoute.snapshot.data["movieDetail"]
  }

  openDialog(): void {
    this.movieService.getMovieTrailersById(this.activatedRoute.snapshot.params["id"]).subscribe((keyList:string[])=>{
      this.matDialog.open(VideoplayerComponent, {
        data: {trailers: keyList},
        minWidth: 1000,
        minHeight: 600
      });
    })
  }

  generate(num: number){
    return Array.from({length: num}).fill('a')
  }

  getAvgRating() {
    return +this.movieDetail.vote_average.toFixed(2)
  }

  getGenres(){
    const genreList = this.movieDetail.genres.map((genre)=>{
      return genre.name
    })
    return genreList.join(",")
  }

  getReleaseDate() {
    if (this.movieDetail) {
      return this.movieDetail.release_date.split("-")[0]
    }
    return "NA"
  }

  getBackgroundImageURL() {
    return this.movieBackgroundURL+this.movieDetail.backdrop_path
  }

  getPosterImageURL() {
    return this.movieBackgroundURL+this.movieDetail.poster_path
  }

  getImagePath() {
    return "url("+this.getBackgroundImageURL()+")"
  }

}
