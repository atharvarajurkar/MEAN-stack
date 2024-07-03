import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../../shared/services/movie.service';
import { Movie } from '../../../shared/interfaces/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, OnDestroy {
  movieList: Movie[] = []
  sbp: Subscription = new Subscription()

  constructor(private movieService: MovieService) { }


  ngOnInit(): void {
    this.sbp.add(this.movieService.getMovies().subscribe())
    this.sbp.add(this.movieService.movieList$.subscribe((movieList: Movie[]) => {
      console.log(movieList,movieList[0].release_date, typeof(movieList[0].release_date))
      this.movieList = movieList
    }))
  }

  generate(num: number) {
    return new Array(num).fill(0).map((_, i) => i)
  }

  ngOnDestroy(): void {
    this.sbp.unsubscribe()
  }
}
