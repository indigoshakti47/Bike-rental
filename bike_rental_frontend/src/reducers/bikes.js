import { SET_BIKES } from '../actions/bike';

const initialState = {
  bikes: [],
};

const BikesReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_BIKES:
      return {
        ...state,
        bikes: action.payload,
      };
    default:
      return state;
  }
};

export default BikesReducer;
