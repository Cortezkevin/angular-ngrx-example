import { createSelector } from '@ngrx/store';
import { NotesState } from '../reducer/notes.reducer';
import { AppState } from '../app.store';

export const selectNote = (state: AppState) => state.note;

export const selectNoteList = createSelector(
  selectNote,
  (state: NotesState) => state.notes
);

export const selectNoteListLoading = createSelector(
  selectNote,
  (state: NotesState) => state.loadingNotes
);

export const selectNoteDeletionLoading = createSelector(
  selectNote,
  (state: NotesState) => state.loadingDeletion
);

export const selectNoteSavingLoading = createSelector(
  selectNote,
  (state: NotesState) => state.loadingSaving
);
