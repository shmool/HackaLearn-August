import { NotesService, Note } from './notes.service';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  username$ = this.authService.clientPrincipal$.pipe(
    tap(console.log),
    map(user => user && user.clientPrincipal ? user.clientPrincipal.userDetails : 'anonymous')
  );

  notes$ = this.notesService.notes$;

  constructor(private authService: AuthService, private notesService: NotesService) {
  }

  ngOnInit(): void {
  }

  saveNote(note: string) {
    this.notesService.addNote(note);
  }

  switchUpdate(note: Note) {
    if (!note.update) {
      note.update = true;
    }
  }

  updateNote(note: Note, content: string) {
    this.notesService.updateNote({...note, content });
    note.update = false;
  }

}
