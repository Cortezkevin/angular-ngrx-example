import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../service/auth.service";

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isLogged = inject( AuthService ).isLogged();
  if( isLogged ){
    inject( Router ).navigate(['/home']);
    return false;
  }
  console.log(isLogged)
  return true;
}