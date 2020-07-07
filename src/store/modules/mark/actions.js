export function loadMarkRequest(textsearch) {
  return {
    type: '@mark/LOAD_MARK_REQUEST',
    payload: { textsearch },
  };
}
export function loadMarkSuccess(mark) {
  return {
    type: '@mark/LOAD_MARK_SUCCESS',
    payload: { mark },
  };
}

export function addNewMarkRequest(mark) {
  return {
    type: '@mark/ADD_NEW_MARK_REQUEST',
    payload: { mark },
  };
}
export function addNewMarkSuccess() {
  return {
    type: '@mark/ADD_NEW_MARK_SUCCESS',
  };
}
export function deleteMarkRequest(_id) {
  return {
    type: '@mark/DELETE_MARK_REQUEST',
    payload: { _id },
  };
}
export function deleteMarkSuccess(_id) {
  return {
    type: '@mark/DELETE_MARK_SUCCESS',
    payload: { _id },
  };
}

export function loadEditMarkRequest(_id) {
  return {
    type: '@mark/LOAD_EDIT_MARK_REQUEST',
    payload: { _id },
  };
}
export function loadEditMarkSuccess(_id) {
  return {
    type: '@mark/LOAD_EDIT_MARK_SUCCESS',
    payload: { _id },
  };
}
export function failureMark() {
  return {
    type: '@mark/FAILURE_MARK',
  };
}
