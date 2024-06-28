import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookService } from '../services/book.service';
import { debounceTime, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  bookname: FormControl = new FormControl('');
  subscription: Subscription = new Subscription()

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.subscription = this.bookname.valueChanges
    .pipe(
      debounceTime(1000),
      switchMap((bookname:string)=>{
        if (bookname && bookname.trim()){
          return this.bookService.searchBooks(bookname)
        } else {
          return of()
        }
      })
    )
    .subscribe()
  }

  resetList() {
    this.bookname.setValue('')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
