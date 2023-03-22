import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { HomeComponent } from './component/home/home.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { authGuard } from './guards/AuthGuard';
import { privateGuard } from './guards/PrivateGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [ authGuard ] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ authGuard ] },
  { path: 'changePassword/:token', component: ChangePasswordComponent, canActivate: [ authGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ privateGuard ] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
