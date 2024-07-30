import { Component } from '@angular/core';
import { TransformDataService } from './services/transform-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  source = [
    ["Foley", "Chemicals", "CHEM"],
    ["Foley", "Chemicals", "CTO"],
    ["Foley", "Chemicals", "LK"],
    ["Foley", "Chemicals", "R8"],
    ["Foley", "Chemicals", "WT"],
    ["Foley", "Finishing", "LB2"],
    ["Foley", "Finishing", "LB4"],
    ["Foley", "Finishing", "RW1"],
    ["Foley", "Finishing", "RW2"],
    ["Foley", "Line 3", "LN3"],
    ["Foley", "Line 3", "Production Process"],
    ["Foley", "Line 4", "LN4"],
    ["Foley", "Line 4", "Prod Process"],
    ["Foley", "Mill General", "Wastewater Treatment"],
    ["Foley", "Powerhouse", "BB1"],
    ["Foley", "Powerhouse", "BB2"],
    ["Foley", "Powerhouse", "EV5"],
    ["Foley", "Powerhouse", "FWE"],
    ["Foley", "Powerhouse", "PB1"],
    ["Foley", "Powerhouse", "PB2"],
    ["Foley", "Powerhouse", "RB2"],
    ["Foley", "Powerhouse", "RB3"],
    ["Foley", "Powerhouse", "RB4"],
    ["Foley", "Powerhouse", "TG2"],
    ["Foley", "Powerhouse", "TG3"],
    ["Foley", "Powerhouse", "TG4"],
  ];
  hierarchicalList!:Map<string,any>
  constructor(private transform: TransformDataService){
    this.hierarchicalList = transform.makeHierarchicalList(this.source)
    // console.log(this.hierarchicalList);
  }
}
