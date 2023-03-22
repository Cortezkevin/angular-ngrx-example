import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../model/response-dto';
import { JwtDto } from '../model/jwt-dto';
import { LoginDto } from '../model/login-dto';
import { NewUserDto } from '../model/new-user-dto';
import { UserDto } from '../model/user-dto';
import { ChangePasswordDto } from '../model/change-password-dto';
import { Store } from '@ngrx/store';
import { selectAuthIsLogged } from '../store/selectors/auth.selectors';
import { AppState } from '../store/app.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = "http://localhost:4000/auth";

  isLogged$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.isLogged$ = store.select( selectAuthIsLogged );
  }

  public login( dto: LoginDto ): Observable<ResponseDto<JwtDto>>{
    return this.http.post<ResponseDto<JwtDto>>(`${this.basePath}/login`, dto);
  }

  public register( dto: NewUserDto ): Observable<ResponseDto<UserDto>>{
    return this.http.post<ResponseDto<UserDto>>(`${this.basePath}/register`, dto);
  }

  public getUserFromToken(): Observable<UserDto>{
    return this.http.get<UserDto>(`${this.basePath}/getUserFromToken`);
  }

  public sendConfirmEmail( email: string ): Observable<ResponseDto<null>>{
    return this.http.get<ResponseDto<null>>(`${this.basePath}/sendEmail/${email}`);
  }

  public changePassword( dto: ChangePasswordDto ): Observable<ResponseDto<null>>{
    return this.http.post<ResponseDto<null>>(`${this.basePath}/changePassword`, dto);
  }

  public isLogged(){
    let isLogged = false;
    this.isLogged$.subscribe({
      next: res => {
        isLogged = res;
      }
    });
    return isLogged;
  }
}
