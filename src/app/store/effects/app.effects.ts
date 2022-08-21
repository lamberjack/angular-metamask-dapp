import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { WalletService } from "src/app/services/wallet.service";
import { retrieveUserWallet, updateUserWallet, userWalletDisconnect, userWalletDisconnected, sendSetTextTransaction, transactionSendError, sendGetTextTransaction, updateActualText, transactionSetTextSuccess } from "../actions/app.action";
import { AppInfoState } from "../reducers/app.reducer";
import { getTextToStore, getUserWalletAddress } from "../selectors/app.selectors";

@Injectable()
export class AppInfoEffects {

    retrieveUserWalletEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(retrieveUserWallet),
            tap(() => console.log('[AppInfoEffect] Retrieve User Wallet API')),
            switchMap(() => this.walletService.getEthereumUserAccounts().pipe(
                map(wallets => {
                    console.log("retrieved wallets: ", wallets)
                    if (wallets[0]) {
                        this.router.navigate(['/dashboard'])
                        return updateUserWallet({ wallet: wallets[0] })
                    } else {
                        throw new Error("No wallet was retrieved!")
                    }
                }),
                catchError(() =>
                    of({ type: '[AppInfoEffect] Metamask Extension Retrieve Error' }))
            ))
        )
    )

    disconnectWalletEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userWalletDisconnect),
            tap(() => {
                console.log('[AppInfoEffect] Disconnection of User Wallet')
                this.router.navigate(['/home'])
            }),
            map(() => {
                return userWalletDisconnected()
            })
        )
    )

    sendSetTextTransactionEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendSetTextTransaction),
            tap(() => console.log('[AppInfoEffect] Sending Set Text transaction')),
            withLatestFrom(this.store.select(getUserWalletAddress), this.store.select(getTextToStore)),
            switchMap(([_, userAddress, textToStore]) => this.walletService.sendSetTextTransaction(userAddress, textToStore).pipe(
                map(res => {
                    console.log("[AppInfoEffect] Set Text Transaction Result", res)
                    const txMsg = "Transaction hash: " + res.transactionHash
                    return transactionSetTextSuccess({ transactionMessage: txMsg })
                }),
                catchError((error) => {
                    console.log("[AppInfoEffect] Set Text Transaction Error", error)
                    return of(transactionSendError({ transactionMessage: error.message }))
                })
            ))
        ))

    sendGetTextTransactionEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendGetTextTransaction),
            tap(() => console.log('[AppInfoEffect] Read Text Data From Contract')),
            switchMap(() => this.walletService.sendGetTextTransaction().pipe(
                map(res => {
                    console.log("[AppInfoEffect] Get Text Value", res)
                    return updateActualText({ text: res })
                }),
                catchError((error) => {
                    console.log("[AppInfoEffect] Get Text Value Error", error)
                    return of(transactionSendError({ transactionMessage: error.message }))
                })
            ))
        ))

    refreshTextContractValue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionSetTextSuccess),
            tap(() => console.log('[AppInfoEffect] Refresh Actual Value From Text Contract')),
            switchMap(() => of(sendGetTextTransaction()))
        ))

    constructor(private actions$: Actions, private walletService: WalletService,
        private store: Store<AppInfoState>, private router: Router) {
    }
}



