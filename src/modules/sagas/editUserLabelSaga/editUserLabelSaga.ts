import { call, put } from 'redux-saga/effects';
import {
    editLabelError,
    EditUserLabelFetch,
    getUserData,
} from '../../actions';
import { API } from '../../../api';

export function* editUserLabelSaga(action: EditUserLabelFetch) {
    try {
        yield call(API.put(), `/api/v2/barong/admin/users/labels`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(editLabelError(error));
    }
}
