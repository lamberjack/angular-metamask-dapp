import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';
import { retrieveUserWallet, updateUserWallet, userWalletDisconnect } from 'src/app/store/actions/app.action';
import { AppInfoState } from 'src/app/store/reducers/app.reducer';
import { getUserWalletAddress } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  currentUserWallet$: Observable<string>
  ethEventSubscriptions: Subscription[] = []

  constructor(private store: Store<AppInfoState>, private modalService: NgbModal,
    private walletService: WalletService,
  ) {
    this.currentUserWallet$ = this.store.pipe(select(getUserWalletAddress))

  }

  ngOnInit(): void {


    this.ethEventSubscriptions.push(this.walletService.getEthereumProvider().subscribe(
      ethereum => ethereum.on('accountsChanged', (wallets: any) => {
        if (wallets[0]) {
          this.store.dispatch(updateUserWallet({ wallet: wallets[0] }))
        } else {
          this.store.dispatch(userWalletDisconnect())
        }
      })))



  }

  ngOnDestroy(): void {
    this.ethEventSubscriptions.forEach(subscriber => subscriber.unsubscribe());
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  onMetamaskConnectListener() {
    this.store.dispatch(retrieveUserWallet())
    this.modalService.dismissAll()
  }

}
