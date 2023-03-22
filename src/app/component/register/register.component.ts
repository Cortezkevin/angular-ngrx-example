import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewUserDto } from 'src/app/model/new-user-dto';
import { registerStart } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.store';
import { selectAuthLoading } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../app.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ){}

  loading$: Observable<boolean> = new Observable();

  ngOnInit(): void {
    this.loading$ = this.store.select( selectAuthLoading );
  }

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', Validators.required],
  })
  
  get username(){ return this.registerForm.get('username') as FormControl }
  get email(){ return this.registerForm.get('email') as FormControl }
  get password(){ return this.registerForm.get('password') as FormControl }

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
    const dto = new NewUserDto( this.username.value, this.email.value, this.password.value );
    this.store.dispatch( registerStart({ newUserDto: dto }) );
  }
}
