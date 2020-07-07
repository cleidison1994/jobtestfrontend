import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import history from '../../../services/history';
import {
  loadCategoriesSuccess,
  addNewCategorySuccess,
  loadEditCategorySuccess,
  deleteCategorySuccess,
  failureCategory,
} from './actions';

export function* loadCategories({ payload }) {
  try {
    const { textsearch } = payload;
    const response = yield call(api.get, 'categories', {
      params: { textsearch },
    });

    yield put(loadCategoriesSuccess(response.data));
  } catch (error) {
    put(failureCategory());
    toast.error('Ocorreu um erro');
  }
}

export function* addNewCategory({ payload }) {
  try {
    const { name, description } = payload.category;
    const response = yield call(api.post, 'categories', {
      name,
      description,
    });

    if (response.data) {
      yield put(addNewCategorySuccess());
      toast.success('Registro salvo');
      history.push('/categories');
    }
  } catch (error) {
    put(failureCategory());
    toast.error('Ocorreu um erro');
  }
}
export function* loadEditCategory({ payload }) {
  try {
    const { _id } = payload;

    if (_id) {
      yield put(loadEditCategorySuccess());
    }
  } catch (error) {
    put(failureCategory());
    toast.error('Ocorreu um erro');
  }
}

export function* deleteCategory({ payload }) {
  try {
    const { _id } = payload;
    yield call(api.delete, `categories/${_id}`);

    yield put(deleteCategorySuccess(_id));
    toast.success('Registo deletado');
  } catch (error) {
    put(failureCategory());
    toast.error('Ocorreu um erro');
  }
}

export default all([
  takeLatest('@category/LOAD_CATEGORY_REQUEST', loadCategories),
  takeLatest('@category/ADD_NEW_CATEGORY_REQUEST', addNewCategory),
  takeLatest('@category/LOAD_EDIT_CATEGORY_REQUEST', loadEditCategory),
  takeLatest('@category/DELETE_CATEGORY_REQUEST', deleteCategory),
]);
