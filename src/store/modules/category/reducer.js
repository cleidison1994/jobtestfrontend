import produce from 'immer';

const INITIAL_STATE = {
  categories: [],
  categoryEdit: {},
  categoryID: null,
  categoryIndex: null,
  loading: false,
};

export default function category(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@category/LOAD_CATEGORY_SUCCESS': {
        draft.categories = action.payload.category;
        break;
      }
      case '@category/ADD_NEW_CATEGORY_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@category/ADD_NEW_CATEGORY_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@category/LOAD_EDIT_CATEGORY_REQUEST': {
        draft.categoryID = null;
        draft.categoryID = action.payload._id;

        break;
      }
      case '@category/LOAD_EDIT_CATEGORY_SUCCESS': {
        draft.categoryEdit = null;
        draft.categoryEdit = draft.categories.find(
          (c) => c._id === draft.categoryID
        );
        break;
      }
      case '@category/DELETE_CATEGORY_REQUEST': {
        draft.categoryIndex = null;
        draft.categoryIndex = draft.categories.findIndex(
          (c) => c._id === action.payload._id
        );
        break;
      }
      case '@category/DELETE_CATEGORY_SUCCESS': {
        draft.categories.splice(draft.productIndex, 1);
        break;
      }
      case '@category/FAILURE_CATEGORY': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
