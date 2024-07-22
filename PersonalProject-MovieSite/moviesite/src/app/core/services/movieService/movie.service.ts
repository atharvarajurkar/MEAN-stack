import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, take, tap } from 'rxjs';
import { Movie, ResObj } from '../../../shared/interfaces/movie';
import { MovieDetail } from '../../../shared/interfaces/moviedetail';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesURL: string = "https://api.themoviedb.org/3/discover/movie?api_key="
  private backendURL: string = "http://localhost:5566/api/v1/movie/"
  private IMAGES: string = "/images"
  private CREDITS: string = "/credits"
  private movieDetailURL: string = "https://api.themoviedb.org/3/movie/"
  private apiKey = "4abe0addafca93d950329e6651ca6c78"
  private id = "id="
  private movieTrailersURL = "https://api.themoviedb.org/3/movie/"


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

  getMovieTrailersById(id: number): Observable<string[]>{
    return this.http.get<string[]>(this.movieTrailersURL+id+"/videos?api_key="+this.apiKey)
    .pipe(
      map((data:any)=>{
        return data.results.filter((x:any)=>x.site=="YouTube").map((x:any)=>x.key)
      }),
      take(1)
    )
  }
  
// http://localhost:5566/api/v1/movie/786892/images
  getMoviePostersById(id: number): Observable<string[]>{
    return this.http.get<string[]>(this.backendURL+id+this.IMAGES)
    .pipe(
      map(({backdrops}:any)=>{
        return backdrops.map((obj:any)=>obj['file_path'])
      }),
      take(1)
    )
  }

  getMovieCastById(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.backendURL+id+this.CREDITS)
    .pipe(
      map(({cast}:any)=>{
        return cast.map((obj:any)=>{
          return {
            name: obj['name'],
            profile_path: obj['profile_path']
          }
        })
      }),
      take(1)
    )
  }
}
