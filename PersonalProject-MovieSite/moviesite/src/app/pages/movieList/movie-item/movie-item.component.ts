import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent implements OnInit, AfterViewInit {

  private moviePosterURL = "https://image.tmdb.org/t/p/w500"
  @Input() movie!: Movie

  @ViewChild('main') movieItem!: ElementRef

  constructor(private renderer: Renderer2, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // console.log("set bg im for ", this.movie.title);
    this.renderer.setStyle(this.movieItem.nativeElement, "background-color", 'red');
  }

  getReleaseDate() {
    if (this.movie) {
      return this.movie.release_date.split("-")[0]
    }
    return "NA"
  }

  getAvgRating() {
    return +this.movie.vote_average.toFixed(2)
  }

  getMovieOverview() {
    if (this.movie.overview.length > 90) {
      return this.movie.overview.slice(0, 90) + "..."
    }
    return this.movie.overview
  }

  getImageURL() {
    return this.moviePosterURL+this.movie.poster_path
  }

  getImagePath() {
    return "url("+this.getImageURL()+")"
  }

  navigateToDetails(){
    console.log("clickeddd");
    this.router.navigate(['../movieDetail'], { relativeTo: this.activatedRoute });
  }
}
