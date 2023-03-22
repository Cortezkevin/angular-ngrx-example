import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangePasswordDto } from 'src/app/model/change-password-dto';
import { AuthService } from 'src/app/service/auth.service';
import { changePasswordStart } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.store';
import { selectAuthLoading } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css','../../app.component.css']
})
export class ChangePasswordComponent implements OnInit{

  loading$: Observable<boolean> = new Observable();

  constructor(
    private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private store: Store<AppState>
  ){}  

  ngOnInit(): void {    
    this.loading$ = this.store.select( selectAuthLoading );
  }

  changeForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  get password() { return this.changeForm.get("password") as FormControl }
  get confirmPassword() { return this.changeForm.get("confirmPassword") as FormControl }

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
    this.routerInfo.params.subscribe({
      next: (res: any) => {
        const tokenPassword = res.token;
        const dto = new ChangePasswordDto( tokenPassword, this.password.value, this.confirmPassword.value );
        this.store.dispatch( changePasswordStart({ changePasswordDto: dto }) );
      }
    }).unsubscribe();
  }

}
