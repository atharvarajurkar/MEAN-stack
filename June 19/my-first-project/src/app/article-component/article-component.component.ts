import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../interfaces/Article.interface';


@Component({
  selector: 'app-article-component',
  templateUrl: './article-component.component.html',
  styleUrl: './article-component.component.scss',
})
export class ArticleComponentComponent {

  @Input() article!: Article
  @Output() titleColorEvent:EventEmitter<string> = new EventEmitter()
  loading:boolean = false

  setTitleColor() {
    this.loading = true
    setTimeout(() => {
      this.titleColorEvent.emit(this.article.themeColor)
      this.loading = false
    }, 1000);
  }
}
