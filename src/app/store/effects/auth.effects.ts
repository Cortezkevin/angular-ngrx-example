import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { JwtDto } from 'src/app/model/jwt-dto';
import { ResponseDto } from 'src/app/model/response-dto';
import { AuthService } from 'src/app/service/auth.service';
import {
  changePasswordStart,
  forgotPasswordError,
  forgotPasswordStart,
  forgotPasswordSuccess,
  loadUserError,
  loadUserStart,
  loadUserSuccess,
  loginError,
  loginStart,
  loginSuccess,
  registerError,
  registerStart,
  registerSuccess,
} from '../actions/auth.actions';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { UserDto } from 'src/app/model/user-dto';

@Injectable()
export class AuthEffects {
  
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserStart),
      exhaustMap(() =>
        this.authService.getUserFromToken().pipe(
          map((res: UserDto) => {
            return loadUserSuccess({ user: res });
          }),
          catchError((err) => {
            if (localStorage.getItem('token')) {
              this.alertService.showSnackBar(err.error.message);
              this.router.navigate(['/login']);
            }
            localStorage.clear();
            return of(loadUserError({ message: err.error.message }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((loginDto) =>
        this.authService.login(loginDto).pipe(
          map((res: ResponseDto<JwtDto>) => {
            const { token, user } = res.content;
            localStorage.setItem('token', token);
            this.router.navigate(['/home']);
            this.alertService.showSnackBar(res.message);
            return loginSuccess({ user, message: res.message });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(loginError({ message: err.error.message }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerStart),
      exhaustMap(({ newUserDto }) =>
        this.authService.register(newUserDto).pipe(
          map((res: ResponseDto<UserDto>) => {
            const user = res.content;
            this.router.navigate(['/login']);
            this.alertService.showSnackBar(res.message);
            return registerSuccess({ user, message: res.message });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(registerError({ message: err.error.message }));
          })
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forgotPasswordStart),
      exhaustMap(({ email }) =>
        this.authService.sendConfirmEmail(email).pipe(
          map((res: ResponseDto<null>) => {
            this.alertService.showSnackBar(res.message);
            return forgotPasswordSuccess({ message: res.message });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(forgotPasswordError({ message: err.error.message }));
          })
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePasswordStart),
      exhaustMap(({ changePasswordDto }) =>
        this.authService.changePassword(changePasswordDto).pipe(
          map((res: ResponseDto<null>) => {
            this.router.navigate(['/login']);
            this.alertService.showSnackBar(res.message);
            return forgotPasswordSuccess({ message: res.message });
          }),
          catchError((err) => {
            this.alertService.showSnackBar(err.error.message);
            return of(forgotPasswordError({ message: err.error.message }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}
}
