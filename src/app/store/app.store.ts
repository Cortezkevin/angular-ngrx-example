import { AuthState } from './reducer/auth.reducer';
import { NotesState } from './reducer/notes.reducer';

export interface AppState {
  auth: AuthState;
  note: NotesState;
}
