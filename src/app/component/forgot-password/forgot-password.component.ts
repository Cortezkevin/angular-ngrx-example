import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { forgotPasswordStart } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.store';
import { selectAuthLoading } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css','../../app.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  loading$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.loading$ = this.store.select( selectAuthLoading );
  }

  email = new FormControl('', [ Validators.required, Validators.email ]);

  getErrorMessage( field: FormControl ){
    if (field.hasError('required')) {
      return 'Required';
    } else if( field.hasError('email')) {
      return 'Not a valid email';
    }else {
      return '';
    }
  }

  sendEmail(){
    console.log(this.email.value)
    this.store.dispatch( forgotPasswordStart({ email: this.email.value! }) );
  }

}
