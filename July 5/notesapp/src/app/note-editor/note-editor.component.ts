import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss'
})
export class NoteEditorComponent implements OnInit {
  title!: string;
  notetext!: string;
  constructor(private noteservice: NoteService) { }

  ngOnInit(): void {
    this.noteservice.notesObs.subscribe(data=>{
      this.title = data.title
      this.notetext = data.notetext
    })
  }

  resetNote() {
    this.notetext = ""
    this.title = ""
  }

  saveNote() {
    this.noteservice.addNote({ title: this.title, notetext: this.notetext })
    this.resetNote()
  }
}
