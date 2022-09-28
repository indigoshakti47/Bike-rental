import { SET_BIKES, SHOW_BIKE } from '../actions/bikes';

const initialState = {
  bikes: [],
  bike: {}

};

const BikesReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_BIKES:
      return {
        ...state,
        bikes: action.payload,
      };
    case SHOW_BIKE:
      return {
        ...state,
        bike: action.payload,
      };
    default:
      return state;
  }
};

export default BikesReducer;
