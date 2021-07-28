import * as ActionTypes from "../actions/ActionTypes";

export const Projects = (
  state = {
    isLoading: true,
    errMsg: null,
    projects: [],
    successMsg: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMsg: null,
        projects: [],
        successMsg: null,
      };
    case ActionTypes.ADD_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        projects: action.payload,
        successMsg: null,
      };
    case ActionTypes.PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        successMsg: null,
      };
    case ActionTypes.POST_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: action.payload,
      };
    case ActionTypes.POST_NEW_PROJECT_FAILED:
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
