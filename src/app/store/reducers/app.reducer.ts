import { createReducer, on } from "@ngrx/store"
import { closeTransactionErrorAlert, closeTransactionSuccessAlert, sendSetTextTransaction, updateUserWallet, userWalletDisconnect, transactionSetTextSuccess, transactionSendError, updateActualText } from "../actions/app.action"

export const appInfoReducerFeatureKey = 'appInfoState';


export interface AppInfoState {

    // Actual text inside name contract
    actualText: string;

    // Value to store inside name contract
    textToStore: string;

    // Wallet address of the user
    userWalletAddress: string;

    // Check if user wallet is connected
    isConnected: boolean;

    // Check if a transaction is executing
    isLoading: boolean;

    // Handle transaction success alert
    transactionSuccessAlertOpen: boolean

    // Handle transaction error alert
    transactionErrorAlertOpen: boolean

    // Message of transaction result
    transactionMessage: string

}

const initialState: AppInfoState = {
    actualText: '',
    textToStore: '',
    userWalletAddress: '',
    isConnected: false,
    isLoading: false,
    transactionSuccessAlertOpen: false,
    transactionErrorAlertOpen: false,
    transactionMessage: ''
}

export const appInfoReducer = createReducer(
    initialState,

    on(updateUserWallet, (state, action) => ({
        ...state,
        userWalletAddress: action.wallet,
        isConnected: true
    })),

    on(userWalletDisconnect, (state, action) => ({
        ...state,
        userWalletAddress: '',
        isConnected: false
    })),


    on(sendSetTextTransaction, (state, action) => ({
        ...state,
        textToStore: action.textToStore,
        isLoading: true
    })),

    on(updateActualText, (state, action) => ({
        ...state,
        actualText: action.text
    })),

    on(transactionSetTextSuccess, (state, action) => ({
        ...state,
        transactionSuccessAlertOpen: true,
        transactionErrorAlertOpen: false,
        transactionMessage: action.transactionMessage,
        isLoading: false
    })),

    on(closeTransactionSuccessAlert, (state, action) => ({
        ...state,
        transactionSuccessAlertOpen: false,
        transactionMessage: ''
    })),

    on(transactionSendError, (state, action) => ({
        ...state,
        transactionErrorAlertOpen: true,
        transactionSuccessAlertOpen: false,
        transactionMessage: action.transactionMessage,
        isLoading: false
    })),

    on(closeTransactionErrorAlert, (state, action) => ({
        ...state,
        transactionErrorAlertOpen: false,
        transactionMessage: ''
    })),


)

