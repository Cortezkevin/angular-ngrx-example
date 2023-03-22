import { createReducer, on } from '@ngrx/store';
import {
  changePasswordError,
  changePasswordStart,
  changePasswordSuccess,
  forgotPasswordError,
  forgotPasswordStart,
  forgotPasswordSuccess,
  loadUserError,
  loadUserStart,
  loadUserSuccess,
  loginError,
  loginStart,
  loginSuccess,
  logout,
  registerError,
  registerStart,
  registerSuccess,
} from '../actions/auth.actions';
import { UserDto } from 'src/app/model/user-dto';

export interface AuthState {
  isLogged: boolean;
  user: UserDto | null;
  loading: boolean;
  message: string;
}

export const initialState: AuthState = {
  isLogged: !!localStorage.getItem('token'),
  user: null,
  loading: false,
  message: '',
};

export const authReducer = createReducer(
  initialState,
  on(loadUserStart, (state) => {
    return { ...state, loading: true };
  }),
  on(loadUserSuccess, (state, { user }) => {
    return { ...state, loading: false, user };
  }),
  on(loadUserError, (state, { message }) => {
    return { ...state, isLogged: false, loading: false, message };
  }),
  on(loginStart, (state) => {
    return { ...state, loading: true };
  }),
  on(loginSuccess, (state, { user, message }) => {
    return { isLogged: true, user: user, loading: false, message: message };
  }),
  on(loginError, (state, { message }) => {
    return { ...state, loading: false, message };
  }),
  on(registerStart, (state) => {
    return { ...state, loading: true };
  }),
  on(registerSuccess, (state, { user, message }) => {
    return { isLogged: false, user: user, loading: false, message: message };
  }),
  on(registerError, (state, { message }) => {
    return { ...state, loading: false, message };
  }),
  on(forgotPasswordStart, (state) => {
    return { ...state, loading: true };
  }),
  on(forgotPasswordSuccess, (state, { message }) => {
    return { ...state, loading: false, message: message };
  }),
  on(forgotPasswordError, (state, { message }) => {
    return { ...state, loading: false, message };
  }),
  on(changePasswordStart, (state) => {
    return { ...state, loading: true };
  }),
  on(changePasswordSuccess, (state, { message }) => {
    return { ...state, loading: false, message: message };
  }),
  on(changePasswordError, (state, { message }) => {
    return { ...state, loading: false, message };
  }),
  on(logout, (state) => {
    return { user: null, isLogged: false, loading: false, message: '' };
  })
);
