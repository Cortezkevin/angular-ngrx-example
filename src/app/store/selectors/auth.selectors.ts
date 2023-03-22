import { createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';
import { AppState } from '../app.store';
import { UserDto } from 'src/app/model/user-dto';

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthIsLogged = createSelector(
  selectAuth,
  (state: AuthState) => state.isLogged
);

export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const selectAuthUsername = createSelector(
  selectAuthUser,
  (state: UserDto | null) => state?.username
);

export const selectAuthLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.loading
);
