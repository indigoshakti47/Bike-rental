import { SET_AUTH_DATA, LOGOUT } from '../actions/auth';

const initialState = {
  user: {},
  token: null
};

const Authreducer = (state = initialState, action) => {
  switch(action.type){
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default Authreducer;
