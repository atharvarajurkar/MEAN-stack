import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformDataService {

  constructor() {
    const a=1
  }

  makeHierarchicalList(source:string[][]): Map<string,any>{
    const hierarchicalList = new Map()
    let currentList = new Map()
    let nextList = new Map()
    for (let item of source) {
      currentList = hierarchicalList
      for(let word of item){
        if(currentList.has(word)){
          nextList = currentList.get(word)
        } else{
          nextList = new Map()
          currentList.set(word,nextList)
        }
        currentList = nextList
      }
    }

    return hierarchicalList
  }
}
