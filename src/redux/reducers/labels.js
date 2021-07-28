import * as ActionTypes from "../actions/ActionTypes";

export const Labels = (
  state = {
    isLoading: true,
    errMsg: null,
    labels: [],
    successMsg: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LABELS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        labels: [],
        successMsg: null,
      };
    case ActionTypes.ADD_LABELS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        labels: action.payload,
        successMsg: null,
      };
    case ActionTypes.LABELS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        successMsg: null,
      };
    case ActionTypes.POST_NEW_LABEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: action.payload,
      };
    case ActionTypes.POST_NEW_LABEL_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        successMsg: null,
      };
    default:
      return state;
  }
};
