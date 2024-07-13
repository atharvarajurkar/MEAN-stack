import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, take, tap } from 'rxjs';
import { Movie, ResObj } from '../interfaces/movie';
import { MovieDetail } from '../interfaces/moviedetail';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesURL: string = "https://api.themoviedb.org/3/discover/movie?api_key="
  private movieDetailURL: string = "https://api.themoviedb.org/3/movie/"
  private apiKey = "4abe0addafca93d950329e6651ca6c78"
  private id = "id="


  private movies$: Subject<Movie[]> = new Subject()
  movieList$: Observable<Movie[]> = this.movies$.asObservable()

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<ResObj>(this.moviesURL + this.apiKey)
      .pipe(
        map((data: ResObj) => {
          return data.results
        }),
        tap((movieList: Movie[]) => {
          this.movies$.next(movieList)
        }),
        take(1)
      )
  }

  getMovieDetailById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(this.movieDetailURL+id +'?api_key='+ this.apiKey)
      .pipe(
        tap((movie: MovieDetail) => {
          console.log(movie)
        }),
        take(1)
      )
  }
}
