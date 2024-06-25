import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-databinding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './databinding.component.html',
  styleUrl: './databinding.component.scss'
})
export class DatabindingComponent {
  city!:string;
  cityList:string[] = ["San Diego","San Francisco","San Jose","Los Angeles"]
  filteredCities:string[] = [];

  filterList(): void {
    this.filteredCities = []
    this.filteredCities = this.cityList.filter(c=>{
      if (this.city && this.city.trim()){
        return c.toLowerCase().includes(this.city.trim().toLowerCase())
      }
      return;
    })
  }

  setCity($event:any){
    this.city = $event.target.innerHTML
    this.filteredCities = []
  }
}
