import BikeService from '../services/BikeService';

export const SET_RATING = 'SET_RATING';

const setRating = (data) => ({
  type: SET_RATING,
  payload: data,
});



export const getRating = (bikeId) => async (dispatch) => {
  const rating = await BikeService.getrating(bikeId);
  dispatch(setRating(rating));
}
