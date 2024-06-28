import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Card } from '../interfaces/book';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.scss'
})
export class BooklistComponent implements OnInit {
  booklist!: Card[];
  hover!: number
  constructor(private bookService: BookService) { }
  ngOnInit(): void {
    this.bookService.bookListObservable$.subscribe((cardList: Card[]) => {
      this.booklist = cardList
    })
  }
  getBoxShadow(index: number) {
    if (this.hover == index) {
      return '3px 3px rgb(97, 96, 97)'
    } else {
      return 'none'
    }
  }

  hoverstart(index: number) {
    this.hover = index
  }

  hoverend() {
    this.hover = -1
  }

  addToWishlist(book: Card){
    this.bookService.addToWishList(book)
  }
}
