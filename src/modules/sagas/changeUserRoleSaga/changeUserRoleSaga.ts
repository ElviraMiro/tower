import { call, put } from 'redux-saga/effects';
import {
    changeUserRoleError,
    ChangeUserRoleFetch,
    getUserData,
} from '../../actions';
import { API } from '../../../api';

export function* changeUserRoleSaga(action: ChangeUserRoleFetch) {
    try {
        yield call(API.put(), `/api/v2/barong/admin/users`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(changeUserRoleError(error));
    }
}
