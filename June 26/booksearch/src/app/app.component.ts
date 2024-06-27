import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { HttpClient } from '@angular/common/http';
import { Book } from './interfaces/book';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  bookname!:string;
  booklist!: Book[];
  filteredBookList!:Book[]
  hover!:number
  booknameControl: FormControl = new FormControl('');
  
  constructor(private bookService: BookService){}
  ngOnInit(): void {
    this.bookService.getData().subscribe(
      data=>{
        this.booklist = JSON.parse(JSON.stringify(data.items))
        this.filteredBookList = this.booklist
      }
    )
  }

  filterList(): void {
    this.filteredBookList = []
    this.filteredBookList = this.booklist.filter(book=>{
      if (!this.booknameControl.value || !this.booknameControl.value.trim()){
        return book
      }
      else if (this.booknameControl.value && this.booknameControl.value.trim()){
        return book.volumeInfo.title.toLowerCase().includes(this.booknameControl.value.trim().toLowerCase())
      }
      return;
    })
  }

  getBoxShadow(index:number){
    if(this.hover==index){
      return '3px 3px rgb(97, 96, 97)'
    } else {
      return 'none'
    }
  }

  hoverstart(index:number){
    this.hover=index
  }

  hoverend(){
    this.hover=-1
  }

}
