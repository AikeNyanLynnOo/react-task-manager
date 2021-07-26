import * as ActionTypes from "../actions/ActionTypes";

export const Tasks = (
  state = {
    isLoading: true,
    errMsg: null,
    successMsg: null,
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
    case ActionTypes.POST_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: action.payload,
      };
    case ActionTypes.POST_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        successMsg: null,
      };
    case ActionTypes.PUT_TASK_SUCCESS:
      console.log("put task success")
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: action.payload,
      };
    case ActionTypes.PUT_TASK_FAILED:
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
