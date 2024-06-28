import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  datarow1:any = {
    heading: "Enjoy on your TV.",
    subheading: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    imagename: "tv"
  }
  datarow2:any = {
    heading: "Enjoy on your TV.",
    subheading: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    imagename: "device"
  }
  datarow3:any = {
    heading: "Enjoy on your TV.",
    subheading: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    imagename: "mobile"
  }
  datarow4:any = {
    heading: "Enjoy on your TV.",
    subheading: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    imagename: "kids"
  }
  datarows = [this.datarow1,this.datarow2,this.datarow3,this.datarow4]
}
