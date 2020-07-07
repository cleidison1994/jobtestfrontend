import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import Signin from '../pages/SignIn';
import Signup from '../pages/SingnUp';

import Home from '../pages/Home';

import CategoryList from '../pages/Category/List';
import CategoryForm from '../pages/Category/Form';
import CategoryEdit from '../pages/Category/Edit';

import MarkList from '../pages/Mark/List';
import MarkForm from '../pages/Mark/Form';
import MarkEdit from '../pages/Mark/Edit';

import ProductList from '../pages/Product/List';
import ProductForm from '../pages/Product/Form';
import ProductEdit from '../pages/Product/Edit';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/register" component={Signup} />

      <Route path="/home" component={Home} Isprivate />

      <Route path="/categories" component={CategoryList} Isprivate />
      <Route path="/category-new" component={CategoryForm} Isprivate />
      <Route path="/category-edit" component={CategoryEdit} Isprivate />

      <Route path="/marks" component={MarkList} Isprivate />
      <Route path="/mark-new" component={MarkForm} Isprivate />
      <Route path="/mark-edit" component={MarkEdit} Isprivate />

      <Route path="/products" component={ProductList} Isprivate />
      <Route path="/product-new" component={ProductForm} Isprivate />
      <Route path="/product-edit" component={ProductEdit} Isprivate />
    </Switch>
  );
}
export default Routes;
