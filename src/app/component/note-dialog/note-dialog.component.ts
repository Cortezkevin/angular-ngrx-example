import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SaveNoteDto } from 'src/app/model/save-note-dto';
import { UserDto } from 'src/app/model/user-dto';
import { noteCreateStart, noteUpdateStart } from 'src/app/store/actions/notes.actions';
import { AppState } from 'src/app/store/app.store';
import { selectAuthUser } from 'src/app/store/selectors/auth.selectors';
import { selectNoteSavingLoading } from 'src/app/store/selectors/notes.selectors';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  user$: Observable<UserDto | null> = new Observable();
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}  

  ngOnInit(): void {
    this.isLoading$ = this.store.select( selectNoteSavingLoading  );
    this.user$ = this.store.select( selectAuthUser );
  }

  noteId = this.data.note ? this.data.note.id : '';

  noteForm = this.fb.group({
    title: [this.data.note ? this.data.note.title : '', Validators.required],
    body: [this.data.note ? this.data.note.body : '', Validators.required]
  })

  get title(){ return this.noteForm.get('title') as FormControl }
  get body(){ return this.noteForm.get('body') as FormControl }
  
  onSubmit(){
    const dto = new SaveNoteDto( this.title.value, this.body.value );
    this.user$.subscribe( user => {
      if( this.noteId !== ''){        
        this.store.dispatch( noteUpdateStart({ note: dto, userId: user!.id, noteId: this.noteId }) );
      }else {
        this.store.dispatch( noteCreateStart({ note: dto, userId: user!.id }) );
      }
    }).unsubscribe();
  }

  getErrorMessage( field: FormControl ){
    if (field.hasError('required')) {
      return 'Required';
    } else if( field.hasError('email')) {
      return 'Not a valid email';
    }else {
      return '';
    }
  }
}
