import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent implements OnInit {

  @Input() menulist!: any
  viewMap: any = {}

  ngOnInit(): void {
    for(let menuElement of this.menulist){
      this.viewMap[menuElement.name] = false
    }
    console.log("viewmap oninit",this.viewMap);
    
  }

  toggleView(itemName: string) {
    console.log("viewmap before",this.viewMap);
    this.viewMap[itemName] = !this.viewMap[itemName]
    console.log("viewmap after",this.viewMap);
  }

}
