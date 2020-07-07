export function loadCategoriesRequest(textsearch) {
  return {
    type: '@category/LOAD_CATEGORY_REQUEST',
    payload: { textsearch },
  };
}
export function loadCategoriesSuccess(category) {
  return {
    type: '@category/LOAD_CATEGORY_SUCCESS',
    payload: { category },
  };
}

export function addNewCategoryRequest(category) {
  return {
    type: '@category/ADD_NEW_CATEGORY_REQUEST',
    payload: { category },
  };
}
export function addNewCategorySuccess() {
  return {
    type: '@category/ADD_NEW_CATEGORY_SUCCESS',
  };
}
export function loadEditCategoryRequest(_id) {
  return {
    type: '@category/LOAD_EDIT_CATEGORY_REQUEST',
    payload: { _id },
  };
}
export function loadEditCategorySuccess() {
  return {
    type: '@category/LOAD_EDIT_CATEGORY_SUCCESS',
  };
}
export function deleteCategoryRequest(_id) {
  return {
    type: '@category/DELETE_CATEGORY_REQUEST',
    payload: { _id },
  };
}
export function deleteCategorySuccess(_id) {
  return {
    type: '@category/DELETE_CATEGORY_SUCCESS',
    payload: { _id },
  };
}
export function failureCategory() {
  return {
    type: '@category/FAILURE_CATEGORY',
  };
}
