import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUserStart, logout } from './store/actions/auth.actions';
import {
  selectAuthIsLogged,
  selectAuthLoading,
  selectAuthUsername,
} from './store/selectors/auth.selectors';
import { AppState } from './store/app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  isLoading$: Observable<boolean> = new Observable();
  isLogged$: Observable<boolean> = new Observable();
  username$: Observable<string | undefined> = new Observable();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectAuthLoading);
    this.isLogged$ = this.store.select(selectAuthIsLogged);
    this.username$ = this.store.select(selectAuthUsername);

    this.store.dispatch(loadUserStart());
  }

  onLogout() {
    this.store.dispatch(logout());
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
