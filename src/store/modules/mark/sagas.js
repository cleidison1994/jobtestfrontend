import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import history from '../../../services/history';

import {
  loadMarkSuccess,
  addNewMarkSuccess,
  deleteMarkSuccess,
  loadEditMarkSuccess,
  failureMark,
} from './actions';

export function* loadMarkSearch({ payload }) {
  try {
    const { textsearch } = payload;

    const response = yield call(api.get, 'marks', {
      params: {
        textsearch,
      },
    });
    if (response.data) {
      yield put(loadMarkSuccess(response.data));
    }
  } catch (error) {
    put(failureMark());
    toast.error('Ocorreu um erro');
  }
}
export function* addNewMark({ payload }) {
  try {
    const { mark } = payload;

    const response = yield call(api.post, 'marks', mark);
    if (response.data) {
      yield put(addNewMarkSuccess());
      toast.success('Registro salvo');
      history.push('/marks');
    }
  } catch (error) {
    put(failureMark());
    toast.error('Ocorreu um erro');
  }
}

export function* loadEditMark({ payload }) {
  try {
    const { _id } = payload;

    yield put(loadEditMarkSuccess(_id));
  } catch (error) {
    put(failureMark());
    toast.error('Ocorreu um erro');
  }
}
export function* deleteMark({ payload }) {
  try {
    const { _id } = payload;

    yield call(api.delete, `marks/${_id}`);
    yield put(deleteMarkSuccess(_id));
    toast.success('Registro deletado');
  } catch (error) {
    put(failureMark());
    toast.error('Ocorreu um erro');
  }
}
export default all([
  takeLatest('@mark/LOAD_MARK_REQUEST', loadMarkSearch),
  takeLatest('@mark/ADD_NEW_MARK_REQUEST', addNewMark),
  takeLatest('@mark/LOAD_EDIT_MARK_REQUEST', loadEditMark),
  takeLatest('@mark/DELETE_MARK_REQUEST', deleteMark),
]);
