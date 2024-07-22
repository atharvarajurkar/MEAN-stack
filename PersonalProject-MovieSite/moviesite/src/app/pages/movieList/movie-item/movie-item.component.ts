import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent implements OnInit, AfterViewInit {

  private moviePosterURL = "https://image.tmdb.org/t/p/w500"
  isClicked: boolean = false
  @Input() movie!: Movie
  // @Output() clickEventEmitter: EventEmitter<void> = new EventEmitter<void>()

  @ViewChild('main') movieItem!: ElementRef

  constructor(private renderer: Renderer2, private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

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
    return this.moviePosterURL + this.movie.poster_path
  }

  getImagePath() {
    return "url(" + this.getImageURL() + ")"
  }

  isLoading(): boolean {
    return this.isClicked && this.authService.loading$.value
  }

  navigateToDetails() {
    // this.clickEventEmitter.emit()
    this.isClicked = true
    this.authService.loading$.next(true)
    this.router.navigate(['../movieDetail', this.movie.id], { relativeTo: this.activatedRoute });
    setTimeout(() => { this.isClicked = false }, 1000)
  }
}
