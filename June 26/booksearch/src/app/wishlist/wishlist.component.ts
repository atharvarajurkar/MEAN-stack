import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';
import { Card } from '../interfaces/book';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  hover!: number
  wishlistSubscription: Subscription = new Subscription()
  wishlist!: Card[]
  constructor(private bookService: BookService) { }


  ngOnInit(): void {
    this.wishlist = []
    this.wishlistSubscription = this.bookService.wishListObservable$.subscribe((wishList: Card[]) => {
      this.wishlist = wishList
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

  removeItem(book: Card){
    console.log("X clicked");
    this.bookService.removeFromWishList(book)
  }

  ngOnDestroy(): void {
    this.wishlistSubscription.unsubscribe()
  }
}
