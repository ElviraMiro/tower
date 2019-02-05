import { call, put } from 'redux-saga/effects';
import {
    addNewLabelError,
    AddUserLabelFetch,
    getUserData,
} from '../../actions';
import { API } from '../../../api';

export function* addUserLabelSaga(action: AddUserLabelFetch) {
    try {
        yield call(API.post(), `/api/v2/barong/admin/users/labels`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(addNewLabelError(error));
    }
}
