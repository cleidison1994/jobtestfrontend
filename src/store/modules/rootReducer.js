import { combineReducers } from 'redux';

import auth from './auth/reducer';
import category from './category/reducer';
import product from './product/reducer';
import mark from './mark/reducer';

export default combineReducers({ auth, category, product, mark });
