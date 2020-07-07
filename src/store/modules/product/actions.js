export function loadProductRequest(textsearch, category, mark) {
  return {
    type: '@product/LOAD_PRODUCT_REQUEST',
    payload: { textsearch, category, mark },
  };
}

export function loadProductSuccess(products) {
  return {
    type: '@product/LOAD_PRODUCT_SUCCESS',
    payload: { products },
  };
}

export function addNewProductRequest(data) {
  return {
    type: '@product/ADD_PRODUCT_REQUEST',
    payload: { data },
  };
}

export function addNewProductSuccess() {
  return {
    type: '@product/ADD_PRODUCT_SUCCESS',
  };
}

export function deleteProductRequest(_id) {
  return {
    type: '@product/DELETE_PRODUCT_REQUEST',
    payload: { _id },
  };
}
export function deleteProductSuccess(_id) {
  return {
    type: '@product/DELETE_PRODUCT_SUCCESS',
    payload: { _id },
  };
}

export function loadCategoryFilterResquest() {
  return {
    type: '@category/LOAD_CATEGORYFILTER_REQUEST',
  };
}
export function loadCategoryFilterSuccess(category) {
  return {
    type: '@category/LOAD_CATEGORYFILTER_SUCCESS',
    payload: { category },
  };
}
export function loadMarkFilterResquest() {
  return {
    type: '@product/LOAD_MARKFILTER_REQUEST',
  };
}
export function loadMarkFilterSuccess(mark) {
  return {
    type: '@product/LOAD_MARKFILTER_SUCCESS',
    payload: { mark },
  };
}

export function loadEditProductRequest(_id) {
  return {
    type: '@product/LOAD_EDIT_PRODUCT_REQUEST',
    payload: { _id },
  };
}
export function loadEditProductSuccess() {
  return {
    type: '@product/LOAD_EDIT_PRODUCT_SUCCESS',
  };
}

export function failureProduct() {
  return {
    type: '@product/FAILURE',
  };
}
