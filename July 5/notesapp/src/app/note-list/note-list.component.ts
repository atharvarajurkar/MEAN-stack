import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {

  noteList: any[] = [{title:"sample note 1",notetext:"abcd"}]
  constructor(private noteservice: NoteService) { }

  ngOnInit(): void {
    this.noteservice.notesObs.subscribe(data => {
      if (!this.noteList.includes(data)){
        this.noteList = [...this.noteList,data]
      }
    })
  }

  deleteNote(noteObj: any){
    this.noteList = this.noteList.filter(x=>x!=noteObj)
  }

  displayNote(noteObj:any){
    this.noteservice.addNote(noteObj)
  }

}
