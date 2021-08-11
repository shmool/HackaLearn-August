import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Note {
  content: string;
}

const mockNotes = [
  { content: 'Hello'},
  { content: 'World'}
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
    mockNotes.push({ content });
    this.notes$.next(mockNotes);
  }
}
