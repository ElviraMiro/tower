import { call, put } from 'redux-saga/effects';
import { loginError, LoginFetch, loginData, logout, signInRequire2FA } from '../../actions';
import { API } from '../../../api';

export function* loginSaga(action: LoginFetch) {
    try {
        const user = yield call(API.post(), '/api/v2/barong/identity/sessions', action.payload);
        if (user.role === 'admin') {
            yield put(loginData(user));
            document.cookie = 'session=true; path=/';
            window.location.replace('/tower');
        } else {
            yield put(logout());
        }
    } catch (error) {
        const responseStatus = error.code;
        const is2FAEnabled = responseStatus === 403;

        if (is2FAEnabled) {
            yield put(signInRequire2FA({ require2fa: true }));
        } else {
            yield put(loginError(error));
        }
    }
}
