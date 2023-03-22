import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/app/model/login-dto';
import { Store } from '@ngrx/store';
import { loginStart } from 'src/app/store/actions/auth.actions';
import { selectAuthLoading } from 'src/app/store/selectors/auth.selectors';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../app.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ){ }

  loading$: Observable<boolean> = new Observable();

  ngOnInit(): void {
    this.loading$ = this.store.select( selectAuthLoading );
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  
  get username(){ return this.loginForm.get('username') as FormControl }
  get password(){ return this.loginForm.get('password') as FormControl }

  getErrorMessage( field: FormControl ){
    if (field.hasError('required')) {
      return 'Required';
    } else if( field.hasError('email')) {
      return 'Not a valid email';
    }else {
      return '';
    }
  }

  onSubmit(){
    const dto = new LoginDto( this.username.value, this.password.value );
    this.store.dispatch( loginStart( dto ) );
  }

}
