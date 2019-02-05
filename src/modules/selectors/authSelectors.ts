import { AppState, AuthState } from '../reducers';

export const selectAuthSignedInError = (state: AppState): AuthState['error'] =>
    state.auth.error;

export const selectSignInRequire2FA = (state: AppState): AuthState['require2FA'] | undefined =>
    state.auth.require2FA;
