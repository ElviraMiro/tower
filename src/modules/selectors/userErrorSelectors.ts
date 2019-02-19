import { AppState } from '../reducers';

export const selectAddLabelError = (state: AppState): string | undefined =>
    state.addNewLabel.error;

export const selectEditLabelError = (state: AppState): string | undefined =>
    state.editLabel.error;

export const selectDeleteLabelError = (state: AppState): string | undefined =>
    state.deleteLabel.error;

export const selectOTPError = (state: AppState): string | undefined =>
    state.userOTP.error;

export const selectRoleError = (state: AppState): string | undefined =>
    state.userRole.error;

export const selectStateError = (state: AppState): string | undefined =>
    state.userState.error;
