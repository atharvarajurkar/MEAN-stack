import { Component } from '@angular/core';
import { Article } from '../interfaces/Article.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  titleColor: string = 'black'
  title: string = 'my-first-project';
  hover: number = -1

  text:string = "Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.Basically, the deletion can be divided into two stages: Search for a node to remove.If the node is found, delete the node."

  public articleList: Article[] = [
    {
      "id":1,
      "title":"Title 1",
      "data":this.text,
      "themeColor":"blue"
    },
    {
      "id":2,
      "title":"Title 2",
      "data":this.text,
      "themeColor":"yellow"
    },
    {
      "id":3,
      "title":"Title 3",
      "data":this.text,
      "themeColor":"red"
    },
    {
      "id":4,
      "title":"Title 4",
      "data":this.text,
      "themeColor":"green"
    }
  ]

  getBorderColor(i: number): string {
    if (this.hover === i) {
      return this.articleList[i].themeColor
    } else {
      return 'rgb(195, 195, 196)'
    }
  }

  getThemeColor(i: number): string {
    return this.articleList[i].themeColor
  }

  setTitleColor($event: string) {
    console.log($event);
    this.titleColor = $event
  }
}
