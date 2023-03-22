import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/service/alert.service';
import { NoteService } from 'src/app/service/note.service';
import {
  noteCreateStart,
  noteDeleteError,
  noteDeleteStart,
  noteDeleteSuccess,
  noteSaveSuccess,
  noteUpdateStart,
  notesError,
  notesStart,
  notesSuccess,
} from '../actions/notes.actions';
import { NoteDto } from 'src/app/model/note-dto';
import { ResponseDto } from 'src/app/model/response-dto';

@Injectable()
export class NoteEffects {
  
  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notesStart),
      exhaustMap(({ userId }) =>
        this.noteService.getAllByUser(userId).pipe(
          map((res: NoteDto[]) => {
            return notesSuccess({ notes: res });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(notesError({ message: err.error.message }));
          })
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteDeleteStart),
      exhaustMap(({ noteId }) =>
        this.noteService.delete(noteId).pipe(
          map((res: ResponseDto<null>) => {
            this.alertService.showSnackBar(res.message);
            return noteDeleteSuccess({ message: res.message, noteId });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(noteDeleteError({ message: err.error.message }));
          })
        )
      )
    )
  );

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteCreateStart),
      exhaustMap(({ userId, note }) =>
        this.noteService.create(userId, note).pipe(
          map((res: NoteDto) => {
            this.alertService.showSnackBar('Note created Successfully');
            return noteSaveSuccess({
              message: 'Note created Successfully',
              isEdit: false,
              note: res,
            });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(noteDeleteError({ message: err.error.message }));
          })
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteUpdateStart),
      exhaustMap(({ userId, noteId, note }) =>
        this.noteService.update(noteId, userId, note).pipe(
          map((res: NoteDto) => {
            this.alertService.showSnackBar('Note updated Successfully');
            return noteSaveSuccess({
              message: 'Note updated Successfully',
              isEdit: true,
              note: res,
            });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(noteDeleteError({ message: err.error.message }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private noteService: NoteService,
    private alertService: AlertService
  ) {}
}
