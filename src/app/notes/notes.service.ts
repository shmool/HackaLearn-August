import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Note {
  content: string;
  id?: string;
  update: boolean;
}

const mockNotes = [
  { content: 'Hello', update: false},
  { content: 'World',  update: false}
];

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes$ = new BehaviorSubject(mockNotes);

  constructor(private httpClient: HttpClient) {
    this.getNotes();
  }

  getNotes() {
    this.httpClient.get<Note[]>('/api/GetNotes')
    .subscribe(notes => this.notes$.next(notes));
  }

  addNote(content: string) {
    this.httpClient.post<Note>('/api/SaveNote', {content})
    .subscribe((note) => {
      this.notes$.next([note]);
    })
    mockNotes.push({ content, update: false });
    this.notes$.next(mockNotes);
  }

  updateNote(note: Note) {
    this.httpClient.post<Note>('/api/UpdateNote', {note})
    .subscribe((savedNote) => {
      this.notes$.next([savedNote]);
    })
  }
}
