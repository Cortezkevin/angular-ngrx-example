import { createAction, props } from '@ngrx/store';
import {
  NoteCreateStartAction,
  NoteDeleteErrorAction,
  NoteDeleteStartAction,
  NoteDeleteSuccessAction,
  NoteSaveErrorAction,
  NoteSaveSuccessAction,
  NoteUpdateStartAction,
  NotesErrorAction,
  NotesStartAction,
  NotesSuccessAction,
} from '../interfaces/notes.interfaces';

export const notesStart = createAction(
  '[Note Component] Notes Start',
  props<NotesStartAction>()
);

export const notesSuccess = createAction(
  '[Note Component] Notes Success',
  props<NotesSuccessAction>()
);

export const notesError = createAction(
  '[Note Component] Notes Error',
  props<NotesErrorAction>()
);

export const noteDeleteStart = createAction(
  '[Note Component] Note Delete Start',
  props<NoteDeleteStartAction>()
);

export const noteDeleteSuccess = createAction(
  '[Note Component] Note Delete Success',
  props<NoteDeleteSuccessAction>()
);

export const noteDeleteError = createAction(
  '[Note Component] Note Delete Error',
  props<NoteDeleteErrorAction>()
);

export const noteCreateStart = createAction(
  '[Note Component] Note Create Start',
  props<NoteCreateStartAction>()
);

export const noteUpdateStart = createAction(
  '[Note Component] Note Update Start',
  props<NoteUpdateStartAction>()
);

export const noteSaveSuccess = createAction(
  '[Note Component] Note Save Success',
  props<NoteSaveSuccessAction>()
);

export const noteSaveError = createAction(
  '[Note Component] Note Save Error',
  props<NoteSaveErrorAction>()
);
