import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieService } from '../../../shared/services/movie.service';
import { MovieDetail } from '../../../shared/interfaces/moviedetail';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrl: './moviedetail.component.scss'
})
export class MoviedetailComponent implements OnInit {
  private movieBackgroundURL = "https://image.tmdb.org/t/p/w500"
  movieDetail!: MovieDetail
  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService){}
  ngOnInit() {
    console.log("ngOnInit moviedetail",this.activatedRoute.snapshot.params["id"]);
    this.movieService.getMovieDetailById(this.activatedRoute.snapshot.params["id"]).subscribe((moviedetail:MovieDetail)=>{
     this.movieDetail = moviedetail
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
