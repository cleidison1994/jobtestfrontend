import produce from 'immer';

const INITIAL_STATE = {
  products: [],
  productEdit: {},
  productID: null,
  loading: false,
  filterCategory: [],
  filterMark: [],
};

export default function product(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@product/LOAD_PRODUCT_SUCCESS': {
        draft.products = action.payload.products;
        break;
      }
      case '@category/LOAD_CATEGORYFILTER_SUCCESS': {
        draft.filterCategory = action.payload.category;
        break;
      }
      case '@product/ADD_PRODUCT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@product/ADD_PRODUCT_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@product/LOAD_MARKFILTER_SUCCESS': {
        draft.filterMark = action.payload.mark;
        break;
      }

      case '@product/LOAD_EDIT_PRODUCT_REQUEST': {
        draft.productID = action.payload._id;
        break;
      }
      case '@product/LOAD_EDIT_PRODUCT_SUCCESS': {
        draft.productEdit = draft.products.find(
          (p) => p._id === draft.productID
        );
        break;
      }
      case '@product/DELETE_PRODUCT_SUCCESS': {
        draft.products.splice((p) => p._id === action.payload._id, 1);
        break;
      }
      case '@product/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
