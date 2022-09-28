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


export const listBikes = (shopId) => async (dispatch) => {
  const bikes = await BikeService.getBikes({shop: shopId});
  dispatch(setBikes(bikes));
}

export const createBike = (newBike) => async (dispatch) => {
  const { shop } = newBike;
  await BikeService.createBike(newBike);
  dispatch(listBikes(shop));
}

export const updateBike = (bikeId, updatedBike) => async (dispatch) => {
  const { shop } = updatedBike;
  delete updatedBike.shop;
  await BikeService.updateBike(bikeId, updatedBike);
  dispatch(listBikes(shop));
}

export const deleteBike = (bikeId, shopId) => async (dispatch) => {
  await BikeService.deleteBike(bikeId);
  dispatch(listBikes(shopId));
}
export const getBikeById = (bikeId) => async (dispatch) => {
  const bike = await BikeService.getBikeById(bikeId);
  console.log(bike)
  dispatch(getBike(bike));
}
