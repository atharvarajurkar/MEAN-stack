import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { Card, Result } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  private bookList$ = new Subject<Card[]>()
  bookListObservable$: Observable<Card[]> = this.bookList$.asObservable()

  private wishList$ = new BehaviorSubject<Card[]>([])
  wishListObservable$: Observable<Card[]> = this.wishList$.asObservable()

  constructor(private http: HttpClient) { }

  searchBooks(bookname: string) {
    return this.http.get<Result>(this.apiUrl + bookname)
      .pipe(
        map((res: Result) => {
          return res.items.map(bookitem => {
            const obj = {
              'picture': bookitem.volumeInfo.imageLinks?.thumbnail || '',
              'name': bookitem.volumeInfo.title,
              'publisher': bookitem.volumeInfo.publisher,
              'publishedDate': bookitem.volumeInfo.publishedDate,
              'desc': bookitem.volumeInfo.description
            }
            const card: Card = JSON.parse(JSON.stringify(obj))
            return card
          })
        }),
        tap((cardList: Card[]) => {
          this.bookList$.next(cardList)
        })
      )
  }

  addToWishList(book: Card) {
    if (!this.wishList$.value.includes(book)) {
      const arr = [...this.wishList$.value, book]
      this.wishList$.next(arr)
    }
  }

  removeFromWishList(book: Card) {
    const arr = this.wishList$.value.filter(item => item != book)
    this.wishList$.next(arr)
  }
}
