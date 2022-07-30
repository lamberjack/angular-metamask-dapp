import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { env } from 'process';
import { Observable, mergeMap, of } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';
import { closeTransactionErrorAlert, closeTransactionSuccessAlert, sendGetTextTransaction, sendGetNumberTransaction, sendSetTextTransaction, sendSetNumberTransaction } from 'src/app/store/actions/app.action';
import { AppInfoState } from 'src/app/store/reducers/app.reducer';
import { getTransactionMessage, getIsTransactionError, getIsTransactionSuccess, getUserWalletAddress, getActualText } from 'src/app/store/selectors/app.selectors';
import { environment } from 'src/environments/environment';


const NETWORK_ADDRESS = environment.network_name
const NAME_CONTRACT_ADDRESS = environment.write_name_contract_address

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {

  nameContractUrl: string
  currentUserWallet$: Observable<string>
  isTransactionSuccess$: Observable<boolean>
  isTransactionError$: Observable<boolean>
  transactionMessage$ : Observable<string>
  actualName$: Observable<string>;
  inputText: string;



  constructor(private store: Store<AppInfoState>, private walletService: WalletService) {
    this.nameContractUrl = 'https://'+NETWORK_ADDRESS+'/address/'+NAME_CONTRACT_ADDRESS
    this.inputText = '';
    this.currentUserWallet$ = this.store.pipe(select(getUserWalletAddress))
    this.isTransactionSuccess$ = this.store.pipe(select(getIsTransactionSuccess))
    this.isTransactionError$ = this.store.pipe(select(getIsTransactionError))
    this.transactionMessage$ = this.store.pipe(select(getTransactionMessage))
    this.actualName$ = this.store.pipe(select(getActualText))
  }

  ngOnInit(): void {
    this.store.dispatch(sendGetTextTransaction())
  }

  sendSetTextTransactionListener() {
    this.store.dispatch(sendSetTextTransaction({
      textToStore: this.inputText
    }))
  }

  closeSuccessAlert(){
    this.store.dispatch(closeTransactionSuccessAlert())
  }

  closeErrorAlert(){
    this.store.dispatch(closeTransactionErrorAlert())
  }
}
