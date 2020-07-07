import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  user: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGNIN_SUCCESS': {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGNIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT_SUCCESS': {
        draft.token = null;
        draft.signed = false;
        draft.user = null;
        break;
      }
      case '@auth/ADD_NEW_USER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/ADD_NEW_USER_SUCCESS': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
