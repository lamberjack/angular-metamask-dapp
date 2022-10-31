import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getContractText } from 'src/app/store/actions/app.action';
import { AppInfoState } from 'src/app/store/reducers/app.reducer';
import { getActualText, getUserWalletAddress } from 'src/app/store/selectors/app.selectors';
import { environment } from 'src/environments/environment';



const NETWORK_ADDRESS = environment.network_name
const NAME_CONTRACT_ADDRESS = environment.write_name_contract_address

@Component({
  selector: 'view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {

  nameContractUrl: string
  currentUserWallet$: Observable<string>
  actualName$: Observable<string>;

  constructor(private store: Store<AppInfoState>) { 
    this.nameContractUrl = 'https://'+NETWORK_ADDRESS+'/address/'+NAME_CONTRACT_ADDRESS
    this.currentUserWallet$ = this.store.pipe(select(getUserWalletAddress))
    this.actualName$ = this.store.pipe(select(getActualText))

  }

  ngOnInit(): void {
    this.store.dispatch(getContractText())
  }
}
