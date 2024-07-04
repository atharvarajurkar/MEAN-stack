import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MovieService } from '../../../shared/services/movie.service';
import { Movie } from '../../../shared/interfaces/movie';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('virtualViewPort') infScrollContainer!: any
  movieList: Movie[] = []
  sbp: Subscription = new Subscription()

  constructor(private movieService: MovieService, private renderer:Renderer2) { }

  ngOnInit(): void {
    this.sbp.add(this.movieService.getMovies().subscribe())
    this.sbp.add(this.movieService.movieList$.subscribe((movieList: Movie[]) => {
      this.movieList = movieList
    }))
  }

  ngAfterViewInit(): void {
    // console.log("after view init inf",this.infScrollContainer.elementRef.nativeElement);
    // this.renderer.addClass(this.infScrollContainer.elementRef.nativeElement.children[0],"test");
    this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement.children[0],"width","100%");
    this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement.children[0],"height","100%");
    this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement.children[0],"display","flex");
    this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement.children[0],"justify-content","flex-start");
    this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement.children[0],"flex-wrap","wrap");
    this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement.children[0],"align-content","flex-start");
    this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement.children[0],"overflow","auto");
    // this.renderer.setStyle(this.infScrollContainer.elementRef.nativeElement,"overflow", "none");
  }


  generate(num: number) {
    return new Array(num).fill(0).map((_, i) => i)
  }

  ngOnDestroy(): void {
    this.sbp.unsubscribe()
  }
}
