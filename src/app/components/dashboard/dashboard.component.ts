import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';
import { closeTransactionErrorAlert, closeTransactionSuccessAlert, getContractText, setContractText} from 'src/app/store/actions/app.action';
import { AppInfoState } from 'src/app/store/reducers/app.reducer';
import { getTransactionMessage, getIsTransactionError, getIsTransactionSuccess, getUserWalletAddress, getActualText, isTransactionLoading } from 'src/app/store/selectors/app.selectors';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

}
