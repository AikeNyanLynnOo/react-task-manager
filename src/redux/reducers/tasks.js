import * as ActionTypes from "../actions/ActionTypes";

export const Tasks = (
  state = {
    isLoading: true,
    errMsg: null,
    successMsg: null,
    tasks: [],
    filter: 0,
    sort: "dueDate",
    order: "desc",
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
    case ActionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: action.payload,
      };
    case ActionTypes.DELETE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        successMsg: null,
      };
    case ActionTypes.CHANGE_FILTER_TYPE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: null,
        filter: action.payload,
      };
    case ActionTypes.CHANGE_SORT_TYPE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: null,
        sort: action.payload,
      };
    case ActionTypes.CHANGE_ORDER_TYPE:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        successMsg: null,
        order: action.payload,
      };
    default:
      return state;
  }
};
