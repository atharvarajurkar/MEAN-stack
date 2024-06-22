import { Component, Input } from "@angular/core";
import { Rating } from "../interfaces/rating";


@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.scss'
})
export class RatingListComponent {
  @Input() ratings!:Rating[]
}
