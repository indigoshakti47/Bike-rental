import { SET_ALERT } from '../actions/alerts';

const initialState = {
  alert: null
};

const AlertReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
};

export default AlertReducer;
