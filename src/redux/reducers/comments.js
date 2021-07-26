import * as ActionTypes from "../actions/ActionTypes";

export const Comments = (
  state = {
    isLoading: true,
    errMsg: null,
    successMsg: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        comments: [],
        successMsg: null,
      };
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        successMsg: null,
      };
    case ActionTypes.POST_NEW_CMT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: action.payload,
      };
    default:
      return state;
  }
};
