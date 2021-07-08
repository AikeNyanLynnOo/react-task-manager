import * as ActionTypes from "../actions/ActionTypes";

export const Tasks = (
  state = {
    isLoading: true,
    errMsg: null,
    tasks: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.TASKS_LOADING:
      return { ...state, isLoading: true, errMsg: null, tasks: [] };
    case ActionTypes.ADD_TASKS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        tasks: action.payload,
      };
    case ActionTypes.TASKS_FAILED:
      return { ...state, isLoading: false, errMsg: action.payload };
    default:
      return state;
  }
};
