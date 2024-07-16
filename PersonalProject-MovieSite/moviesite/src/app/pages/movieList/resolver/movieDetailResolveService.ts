import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { MovieService } from '../../../core/services/movieService/movie.service';
import { MovieDetail } from '../../../shared/interfaces/moviedetail';

@Injectable()
export class MovieDetailResolveService implements Resolve<MovieDetail> {

    constructor(private router: Router, private movieService: MovieService) { }

    resolve(activatedRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<MovieDetail> {

        return this.movieService.getMovieDetailById(activatedRoute.params["id"]).pipe(
            delay(1000)
        )
    }
}