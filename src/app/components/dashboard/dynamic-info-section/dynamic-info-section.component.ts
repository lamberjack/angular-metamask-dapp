import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeTransactionErrorAlert, closeTransactionSuccessAlert } from 'src/app/store/actions/app.action';
import { AppInfoState } from 'src/app/store/reducers/app.reducer';
import { getIsTransactionError, getIsTransactionSuccess, getTransactionMessage, isTransactionLoading } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'dynamic-info-section',
  templateUrl: './dynamic-info-section.component.html',
  styleUrls: ['./dynamic-info-section.component.css']
})
export class DynamicInfoSectionComponent {


  isTransactionLoading$: Observable<boolean>;
  isTransactionSuccess$: Observable<boolean>
  isTransactionError$: Observable<boolean>
  transactionMessage$ : Observable<string>
  
  constructor(private store: Store<AppInfoState>) { 
    this.isTransactionSuccess$ = this.store.pipe(select(getIsTransactionSuccess))
    this.isTransactionError$ = this.store.pipe(select(getIsTransactionError))
    this.transactionMessage$ = this.store.pipe(select(getTransactionMessage))
    this.isTransactionLoading$ = this.store.pipe(select(isTransactionLoading))
  }

  closeSuccessAlert(){
    this.store.dispatch(closeTransactionSuccessAlert())
  }

  closeErrorAlert(){
    this.store.dispatch(closeTransactionErrorAlert())
  }

}
