import { createReducer, on } from '@ngrx/store';
import { NoteDto } from 'src/app/model/note-dto';
import {
  noteDeleteError,
  noteDeleteStart,
  noteDeleteSuccess,
  noteSaveError,
  noteCreateStart,
  noteUpdateStart,
  noteSaveSuccess,
  notesError,
  notesStart,
  notesSuccess,
} from '../actions/notes.actions';

export interface NotesState {
  notes: NoteDto[];
  loadingNotes: boolean;
  loadingDeletion: boolean;
  loadingSaving: boolean;
  message: string;
}

export const initialState: NotesState = {
  notes: [],
  loadingNotes: false,
  loadingDeletion: false,
  loadingSaving: false,
  message: '',
};

export const noteReducer = createReducer(
  initialState,
  on(notesStart, (state) => {
    return { ...state, loadingNotes: true };
  }),
  on(notesSuccess, (state, { notes }) => {
    return { ...state, loadingNotes: false, notes };
  }),
  on(notesError, (state, { message }) => {
    return { ...state, loadingNotes: false, message };
  }),
  on(noteDeleteStart, (state) => {
    return { ...state, loadingDeletion: true };
  }),
  on(noteDeleteSuccess, (state, { message, noteId }) => {
    return {
      ...state,
      loadingDeletion: false,
      message,
      notes: state.notes.filter((n) => n.id !== noteId),
    };
  }),
  on(noteDeleteError, (state, { message }) => {
    return { ...state, loadingDeletion: false, message };
  }),
  on(noteUpdateStart, (state) => {
    return { ...state, loadingSaving: true };
  }),
  on(noteCreateStart, (state) => {
    return { ...state, loadingSaving: true };
  }),
  on(noteSaveSuccess, (state, { message, note, isEdit }) => {
    return {
      ...state,
      loadingSaving: false,
      message,
      notes: isEdit
        ? state.notes.map((n) => {
            if (n.id === note.id) {
              return note;
            }
            return n;
          })
        : [...state.notes, note],
    };
  }),
  on(noteSaveError, (state, { message }) => {
    return { ...state, loadingSaving: false, message };
  })
);
