import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDto } from 'src/app/model/note-dto';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNoteDeletionLoading, selectNoteList, selectNoteListLoading } from 'src/app/store/selectors/notes.selectors';
import { AppState } from 'src/app/store/app.store';
import { noteDeleteStart, notesStart } from 'src/app/store/actions/notes.actions';
import { UserDto } from 'src/app/model/user-dto';
import { selectAuthUser } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  noteList: NoteDto[] = [];

  isLoading$: Observable<boolean> = new Observable();
  user$: Observable<UserDto | null> = new Observable();
  noteList$: Observable<NoteDto[]> = new Observable();

  isLoadingDeletion$: Observable<boolean> = new Observable();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ){ }

  ngOnInit(): void {
    this.user$ = this.store.select( selectAuthUser );
    this.isLoading$ = this.store.select( selectNoteListLoading );
    this.noteList$ = this.store.select( selectNoteList );
    this.isLoadingDeletion$ = this.store.select( selectNoteDeletionLoading )
    this.loadNotes();
  } 
  
  loadNotes(){
    this.user$.subscribe( user => {
      if( user ){
        this.store.dispatch( notesStart({ userId: user.id }) );
      }
    });
  }

  getDateFromTimestamp( timestamp: number ): string{
    const date = new Date( timestamp );
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
  }

  openDialog(note?: NoteDto): void{
    this.dialog.open( NoteDialogComponent , {
      data: {
        title: note ? 'Update' : 'Create',
        note: note ? note : null
      },
      width: '400px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  deleteNote( noteId: string ){
    this.store.dispatch( noteDeleteStart({ noteId }) );
  }

}
