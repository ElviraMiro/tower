import {
  AddNewLabelState,
  AppState,
  ChangeUserOTPState,
  ChangeUserRoleState,
  ChangeUserStateState,
  DeleteLabelState,
  EditLabelState,

} from '../reducers';

export const selectAddLabelError = (state: AppState): AddNewLabelState['error'] =>
  state.addNewLabel.error;

export const selectEditLabelError = (state: AppState): EditLabelState['error'] =>
  state.editLabel.error;

export const selectDeleteLabelError = (state: AppState): DeleteLabelState['error'] =>
  state.deleteLabel.error;

export const selectOTPError = (state: AppState): ChangeUserOTPState['error'] =>
  state.userOTP.error;

export const selectRoleError = (state: AppState): ChangeUserRoleState['error'] =>
  state.userRole.error;

export const selectStateError = (state: AppState): ChangeUserStateState['error'] =>
  state.userState.error;
