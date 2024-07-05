import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrl: './moviedetail.component.scss'
})
export class MoviedetailComponent implements OnInit {
  // constructor(private route: Route){

  // }
  ngOnInit() {
    // this.route.dat
  }

  generate(num: number){
    return Array.from({length: num}).fill('a')
  }



}
