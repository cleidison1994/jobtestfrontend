import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import category from './category/sagas';
import product from './product/sagas';
import mark from './mark/sagas';

export default function* rootSaga() {
  return yield all([auth, category, mark, product]);
}
