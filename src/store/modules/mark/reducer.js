import produce from 'immer';

const INITIAL_STATE = {
  marks: [],
  markEdit: {},
  markID: null,
  loading: false,
};
export default function mark(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@mark/LOAD_MARK_SUCCESS': {
        draft.marks = action.payload.mark;
        break;
      }
      case '@mark/ADD_NEW_MARK_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@mark/ADD_NEW_MARK_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@mark/LOAD_EDIT_MARK_REQUEST': {
        draft.markID = action.payload._id;
        break;
      }
      case '@mark/LOAD_EDIT_MARK_SUCCESS': {
        draft.markEdit = draft.marks.find((m) => m._id === action.payload._id);
        break;
      }
      case '@mark/DELETE_MARK_REQUEST': {
        draft.markID = null;
        draft.markID = action.payload._id;
        break;
      }
      case '@mark/DELETE_MARK_SUCCESS': {
        draft.markEdit = {};
        draft.markID = null;
        draft.marks.splice((m) => m._id === action.payload._id, 1);
        break;
      }
      case '@mark/FAILURE_MARK': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
