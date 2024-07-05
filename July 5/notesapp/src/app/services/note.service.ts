import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes$!: Subject<any>
  notesObs: Observable<any>

  constructor() {
    this.notes$ = new Subject()
    this.notesObs = this.notes$.asObservable()
   }

  addNote(noteobj: any){
    console.log(noteobj, "note added to subject");
    this.notes$.next(noteobj)
  }
}
