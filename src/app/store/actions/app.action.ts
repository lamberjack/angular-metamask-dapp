import { createAction, props } from "@ngrx/store";

export const retrieveUserWallet = createAction(
    '[Metamask Info] - Retrieve User Wallet from Browser'
)

export const userWalletDisconnect = createAction(
    '[Metamask Info] - Disconnect User Wallet'
)

export const userWalletDisconnected = createAction(
    '[Metamask Info] - User Wallet successfully disconnected'
)

export const updateUserWallet = createAction(
    '[Metamask Info] - User Wallet retrieved successfully',
    props<{ wallet: string }>()
)

export const setContractText = createAction(
    '[Metamask Info] - Send Transaction to store text',
    props<{ textToStore: string }>()

)

export const getContractText = createAction(
    '[Metamask Info] - Send Transaction to view the text stored in contract'
)

export const updateActualText = createAction(
    '[App Info] - Update actual Text value of the Text contract',
    props<{ text: string }>()
)

export const transactionSetTextSuccess = createAction(
    '[Metamask Info] - Transaction Set Text sent successfully',
    props<{ transactionMessage: string }>()
)

export const closeTransactionSuccessAlert = createAction(
    '[App Info] - Alert of success transaction closed'
)

export const transactionSendError = createAction(
    '[Metamask Info] - Transaction sent with error',
    props<{ transactionMessage: string }>()

)

export const closeTransactionErrorAlert = createAction(
    '[App Info] - Alert of error transaction closed'
)
