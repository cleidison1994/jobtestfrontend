import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import {
  loadProductSuccess,
  addNewProductSuccess,
  deleteProductSuccess,
  failureProduct,
  loadCategoryFilterSuccess,
  loadMarkFilterSuccess,
  loadEditProductSuccess,
} from './actions';

export function* loadProducts({ payload }) {
  try {
    const { textsearch, category, mark } = payload;

    const response = yield call(api.get, 'products', {
      params: {
        textsearch,
        category,
        mark,
      },
    });

    if (response.data) {
      yield put(loadProductSuccess(response.data));
    }
  } catch (error) {
    put(failureProduct());
    toast.error('Ocorreu um erro');
  }
}

export function* addNewProduct({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'products', data);

    if (response.data) {
      yield put(addNewProductSuccess());
      toast.error('Registro salvo');
      history.push('/products');
    }
  } catch (error) {
    put(failureProduct());
    toast.error('Ocorreu um erro');
  }
}

export function* loadEditProduct() {
  try {
    yield put(loadEditProductSuccess());
  } catch (error) {
    toast.error('Ocorreu um erro');
  }
}

export function* deleteProduct({ payload }) {
  try {
    const { _id } = payload;
    yield call(api.delete, `products/${_id}`);

    yield put(deleteProductSuccess(_id));
    toast.success('Registro deletado');
  } catch (error) {
    put(failureProduct());
    toast.error('Ocorreu um erro');
  }
}

export function* loadFilterCategory() {
  try {
    const response = yield call(api.get, 'categories');
    yield put(loadCategoryFilterSuccess(response.data));
  } catch (error) {
    put(failureProduct());
    toast.error('Ocorreu um erro');
  }
}
export function* loadFilterMark() {
  try {
    const response = yield call(api.get, 'marks');
    yield put(loadMarkFilterSuccess(response.data));
  } catch (error) {
    toast.error('Ocorreu um erro');
  }
}

export default all([
  takeLatest('@product/LOAD_PRODUCT_REQUEST', loadProducts),
  takeLatest('@product/ADD_PRODUCT_REQUEST', addNewProduct),
  takeLatest('@product/LOAD_EDIT_PRODUCT_REQUEST', loadEditProduct),
  takeLatest('@product/DELETE_PRODUCT_REQUEST', deleteProduct),
  takeLatest('@category/LOAD_CATEGORYFILTER_REQUEST', loadFilterCategory),
  takeLatest('@product/LOAD_MARKFILTER_REQUEST', loadFilterMark),
]);
