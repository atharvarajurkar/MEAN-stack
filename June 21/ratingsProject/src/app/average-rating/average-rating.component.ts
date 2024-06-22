import { Component, Input, OnInit } from '@angular/core';
import { Rating } from '../interfaces/rating';

@Component({
  selector: 'app-average-rating',
  templateUrl: './average-rating.component.html',
  styleUrl: './average-rating.component.scss'
})
export class AverageRatingComponent implements OnInit{

  @Input() ratings!:Rating[]
  averageRating: number=0

  ngOnInit(): void {
    this.averageRating = this.ratings.map(r=>r.rate).reduce((acc,v)=>acc+v,0)/5
  }
}
