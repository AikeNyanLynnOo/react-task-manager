import * as ActionTypes from "../actions/ActionTypes";

export const Auth = (
  state = {
    isLoading: false,
    isLoggedIn: false,
    isRegisterLoading: false,
    isRegisterSuccess: false,
    registerErr: null,
    user: null,
    errMsg: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        user: null,
        errMsg: null,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        errMsg: null,
      };
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        errMsg: action.payload,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        errMsg: null,
      };
    case ActionTypes.REGISTER_LOADING:
      return {
        ...state,
        isRegisterLoading: true,
        isRegisterSuccess: false,
        registerErr: null,
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterLoading: false,
        isRegisterSuccess: true,
        registerErr: null,
      };
    case ActionTypes.REGISTER_FAILED:
      return {
        ...state,
        isRegisterLoading: false,
        isRegisterSuccess: false,
        registerErr: action.payload,
      };
    default:
      return state;
  }
};
