import * as ActionTypes from "../actions/ActionTypes";

export const Auth = (
  state = {
    isLoading: false,
    isLoggedIn: false,
    user: null,
    errMsg: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_LOADING:
      return { ...state, isLoading: true, isLoggedIn: false };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
