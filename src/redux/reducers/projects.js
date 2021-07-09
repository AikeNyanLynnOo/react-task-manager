import * as ActionTypes from "../actions/ActionTypes";

export const Projects = (
  state = {
    isLoading: true,
    errMsg: null,
    projects: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROJECTS_LOADING:
      return { ...state, isLoading: true, errMsg: null, projects: [] };
    case ActionTypes.ADD_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        projects: action.payload,
      };
    case ActionTypes.PROJECTS_FAILED:
      return { ...state, isLoading: false, errMsg: action.payload };
    default:
      return state;
  }
};
