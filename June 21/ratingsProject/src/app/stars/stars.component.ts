import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent implements OnInit {

  @Input() rate!: number;
  stars:number = 0

  ngOnInit(): void {
    this.stars = Math.ceil(this.rate)
  }

  range(n: number): number[] {
    return Array(n).fill(0).map((_, i) => i);
  }
}
