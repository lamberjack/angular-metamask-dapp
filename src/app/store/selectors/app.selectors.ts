import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  appInfoReducerFeatureKey, AppInfoState } from "../reducers/app.reducer";


export const getAppInfoState = createFeatureSelector<AppInfoState>(appInfoReducerFeatureKey);

export const getUserWalletAddress = createSelector(
    getAppInfoState,
    (state: AppInfoState) => state.userWalletAddress
);

export const getActualText = createSelector(
    getAppInfoState,
    (state: AppInfoState) => state.actualText
);

export const getTextToStore = createSelector(
    getAppInfoState,
    (state: AppInfoState) => state.textToStore
);

export const isUserWalletConnected = createSelector(
    getAppInfoState,
    (state: AppInfoState) => state.isConnected
);

export const getIsTransactionSuccess = createSelector(
    getAppInfoState,
    (state: AppInfoState) => state.transactionSuccessAlertOpen
);

export const getIsTransactionError = createSelector(
    getAppInfoState,
    (state: AppInfoState) => state.transactionErrorAlertOpen
);

export const getTransactionMessage = createSelector(
    getAppInfoState,
    (state: AppInfoState) => state.transactionMessage
);