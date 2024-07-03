import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Movie, ResObj } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesURL: string = "https://api.themoviedb.org/3/discover/movie?api_key="
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
        })
      )
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<ResObj>(this.moviesURL + this.apiKey+'&'+this.id+id)
      .pipe(
        map((data: ResObj) => {
          return data.results[0]
        }),
        // tap((movie: Movie) => {
        //   console.log(movie.poster_path)
        // })
      )
  }
}
