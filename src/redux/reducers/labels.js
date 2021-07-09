import * as ActionTypes from "../actions/ActionTypes";

export const Labels = (
  state = {
    isLoading: true,
    errMsg: null,
    labels: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LABELS_LOADING:
      return { ...state, isLoading: true, errMsg: null, labels: [] };
    case ActionTypes.ADD_LABELS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        labels: action.payload,
      };
    case ActionTypes.LABELS_FAILED:
      return { ...state, isLoading: false, errMsg: action.payload };
    default:
      return state;
  }
};
