import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterCityPipe } from './filter-city.pipe';

@Component({
  selector: 'app-pipe',
  standalone: true,
  imports: [FormsModule, FilterCityPipe],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss'
})
export class PipeComponent {
  city!:string;
  cityList:string[] = ["San Diego","San Francisco","San Jose","Los Angeles"]
  tempcityList:string[] = this.cityList

  setCity($event:any){
    this.city = $event.target.innerHTML
    this.tempcityList = []
  }

  resetTempCityList(){
    this.tempcityList = this.cityList
  }
}
