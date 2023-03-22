import { createAction, props } from '@ngrx/store';
import {
  ChangePasswordErrorAction,
  ChangePasswordStartAction,
  ChangePasswordSuccessAction,
  ForgotPasswordErrorAction,
  ForgotPasswordStartAction,
  ForgotPasswordSuccessAction,
  LoadUserErrorAction,
  LoadUserSuccessAction,
  LoginErrorAction,
  LoginStartAction,
  LoginSuccessAction,
  RegisterErrorAction,
  RegisterStartAction,
  RegisterSuccessAction,
} from '../interfaces/auth.interfaces';

export const loadUserStart = createAction('[Auth Component] Load User Start');

export const loadUserSuccess = createAction(
  '[Auth Component] Load User Success',
  props<LoadUserSuccessAction>()
);
export const loadUserError = createAction(
  '[Auth Component] Load User Error',
  props<LoadUserErrorAction>()
);

export const loginStart = createAction(
  '[Auth Component] Login Start',
  props<LoginStartAction>()
);
export const loginSuccess = createAction(
  '[Auth Component] Login Success',
  props<LoginSuccessAction>()
);
export const loginError = createAction(
  '[Auth Component] Login Error',
  props<LoginErrorAction>()
);

export const registerStart = createAction(
  '[Auth Component] Register Start',
  props<RegisterStartAction>()
);
export const registerSuccess = createAction(
  '[Auth Component] Register Success',
  props<RegisterSuccessAction>()
);
export const registerError = createAction(
  '[Auth Component] Register Error',
  props<RegisterErrorAction>()
);

export const forgotPasswordStart = createAction(
  '[Auth Component] Forgot Password Start',
  props<ForgotPasswordStartAction>()
);
export const forgotPasswordSuccess = createAction(
  '[Auth Component] Forgot Password Success',
  props<ForgotPasswordSuccessAction>()
);
export const forgotPasswordError = createAction(
  '[Auth Component] Forgot Password Error',
  props<ForgotPasswordErrorAction>()
);

export const changePasswordStart = createAction(
  '[Auth Component] Change Password Start',
  props<ChangePasswordStartAction>()
);
export const changePasswordSuccess = createAction(
  '[Auth Component] Change Password Success',
  props<ChangePasswordSuccessAction>()
);
export const changePasswordError = createAction(
  '[Auth Component] Change Password Error',
  props<ChangePasswordErrorAction>()
);

export const logout = createAction('[Auth Component] Logout');
