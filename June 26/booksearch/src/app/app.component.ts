import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  
  constructor(private bookService: BookService){}
  ngOnInit(): void {
    // this.bookService.getData().subscribe(
    //   data=>{
    //     this.booklist = JSON.parse(JSON.stringify(data.items))
    //     this.filteredBookList = this.booklist
    //   }
    // )
  }

  filterList(): void {
    // this.filteredBookList = []
    // this.filteredBookList = this.booklist.filter(book=>{
    //   if (!this.bookname || !this.bookname.trim()){
    //     return book
    //   }
    //   else if (this.bookname && this.bookname.trim()){
    //     return book.volumeInfo.title.toLowerCase().includes(this.bookname.trim().toLowerCase())
    //   }
    //   return;
    // })
  }





}
