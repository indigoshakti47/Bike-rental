import { SET_RATING } from '../actions/rating';

const initialState = {
  rating: {}
};
const RatingReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    
    default:
      return state;
  }
};

export default RatingReducer;
