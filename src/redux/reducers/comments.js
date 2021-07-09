import * as ActionTypes from "../actions/ActionTypes";

export const Comments = (
  state = {
    isLoading: true,
    errMsg: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.COMMENTS_LOADING:
      return { ...state, isLoading: true, errMsg: null, comments: [] };
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, isLoading: false, errMsg: action.payload };
    default:
      return state;
  }
};
