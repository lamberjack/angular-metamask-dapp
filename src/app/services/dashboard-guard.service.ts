import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppInfoState } from '../store/reducers/app.reducer';
import { getUserWalletAddress, isUserWalletConnected } from '../store/selectors/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService implements CanActivate{

  constructor(public router: Router, private store: Store<AppInfoState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> {
    return this.store.pipe(select(isUserWalletConnected)).pipe(
      map((isConnected: boolean) => {
        if(isConnected){
          return true
        }else{
          this.router.navigate(['/not-authorized']);
          return false
        }
      }))
  }
}
