import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { NoteDialogComponent } from './component/note-dialog/note-dialog.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducer/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { NoteEffects } from './store/effects/notes.effects';
import { noteReducer } from './store/reducer/notes.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    NoteDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth : authReducer, note : noteReducer }),
    EffectsModule.forRoot([ AuthEffects, NoteEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
