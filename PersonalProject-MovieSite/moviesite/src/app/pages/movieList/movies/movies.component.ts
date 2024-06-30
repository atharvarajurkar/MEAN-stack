import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  generate(num:number){
    return new Array(num).fill(0).map((_,i)=>i)
  }
}
