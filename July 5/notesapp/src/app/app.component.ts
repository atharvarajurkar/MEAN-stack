import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NoteService } from './services/note.service';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NoteListComponent } from './note-list/note-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NoteEditorComponent, NoteListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title!: string;
  notetext!: string;
  noteList: any[] = [{title:"sample note 1",notetext:"abcd"}]
  constructor(private noteservice: NoteService) { }

  ngOnInit(): void {
    this.noteservice.notesObs.subscribe(data => {
      this.noteList = [...this.noteList,data]
    })
  }

  deleteNote(noteObj: any){
    this.noteList = this.noteList.filter(x=>x!=noteObj)
  }

  displayNote(noteObj:any){
    this.noteservice.addNote(noteObj)
  }

  resetNote() {
    this.notetext = ""
    this.title = ""
  }

  saveNote() {
    console.log("save clicked ", this.title, this.notetext);
    this.noteservice.addNote({ title: this.title, notetext: this.notetext })
    this.resetNote()
  }
}
