import BikeService from '../services/BikeService';


export const SET_BIKES = 'SET_BIKES';
export const SHOW_BIKE = 'SHOW_BIKE';

const setBikes = (data) => ({
  type: SET_BIKES,
  payload: data,
});


const getBike = (data) => ({
  type: SHOW_BIKE,
  payload: data,
});


export const listBikes = (params) => async (dispatch) => {
  const bikes = await BikeService.getBikes(params);
  dispatch(setBikes(bikes));
}

export const createBike = (newBike) => async (dispatch) => {
  await BikeService.createBike(newBike);
  dispatch(listBikes());
}

export const updateBike = (bikeId, updatedBike) => async (dispatch) => {
  await BikeService.updateBike(bikeId, updatedBike);
  dispatch(listBikes());
}

export const deleteBike = (bikeId) => async (dispatch) => {
  await BikeService.deleteBike(bikeId);
  dispatch(listBikes());
}
export const getBikeById = (bikeId) => async (dispatch) => {
  const bike = await BikeService.getBikeById(bikeId);
  dispatch(getBike(bike));
}


export const addRating = (bikeId, params) => async (dispatch) => {
  await BikeService.rating(bikeId, params);
}
