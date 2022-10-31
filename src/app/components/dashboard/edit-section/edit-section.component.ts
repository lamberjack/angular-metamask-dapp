import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setContractText } from 'src/app/store/actions/app.action';
import { AppInfoState } from 'src/app/store/reducers/app.reducer';
import { isTransactionLoading } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent {

  isTransactionLoading$: Observable<boolean>;
  inputText: string;

  constructor(private store: Store<AppInfoState>) {
    this.inputText = '';
    this.isTransactionLoading$ = this.store.pipe(select(isTransactionLoading))
  }

  sendSetTextTransactionListener() {
    this.store.dispatch(setContractText({
      textToStore: this.inputText
    }))
  }

}
