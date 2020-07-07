import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';

import api from '../../../services/api';

import {
  authSignInSuccess,
  signFailure,
  signOutSuccess,
  addNewUserSuccess,
} from './actions';

export function* SignIn({ payload }) {
  try {
    const { email, password } = payload.data;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(authSignInSuccess(token, user));
    toast.success(`Bem vindo ${user.name}`);
    history.push('/home');
  } catch (error) {
    yield put(signFailure());
    toast.error('Verifique suas credenciais');
  }
}
export function* SignOut() {
  try {
    yield put(signOutSuccess());
    history.push('/');
  } catch (error) {
    yield put(signFailure());
    toast.error('Ocorreu um erro');
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export function* AddNewUser({ payload }) {
  try {
    const { name, email, password } = payload.user;

    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    if (response.data) {
      yield put(addNewUserSuccess(response.data));
      history.push('/');
      toast.success('Usario criado com sucesso faça o login');
    }
  } catch (error) {
    yield put(signFailure());
    toast.error('Ocorreu um erro');
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGNIN_REQUEST', SignIn),
  takeLatest('@auth/SIGN_OUT_REQUEST', SignOut),
  takeLatest('@auth/ADD_NEW_USER_REQUEST', AddNewUser),
]);
