export function authSignInRequest(data) {
  return {
    type: '@auth/SIGNIN_REQUEST',
    payload: { data },
  };
}
export function authSignInSuccess(token, user) {
  return {
    type: '@auth/SIGNIN_SUCCESS',
    payload: { token, user },
  };
}
export function signOutRequest() {
  return {
    type: '@auth/SIGN_OUT_REQUEST',
  };
}
export function signOutSuccess() {
  return {
    type: '@auth/SIGN_OUT_SUCCESS',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
export function addNewUserRequest(user) {
  return {
    type: '@auth/ADD_NEW_USER_REQUEST',
    payload: { user },
  };
}
export function addNewUserSuccess(data) {
  return {
    type: '@auth/ADD_NEW_USER_SUCCESS',
    payload: { data },
  };
}
