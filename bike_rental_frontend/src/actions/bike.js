import BikeService from '../services/BikeService';

export const SET_BIKES = 'SET_BIKES';

const setBikes = (data) => ({
  type: SET_BIKES,
  payload: data,
});


export const listBikes = (shopId) => async (dispatch) => {
  const bikes = await BikeService.getBikes({shop: shopId});
  dispatch(setBikes(bikes));
}

export const createBike = (newBike) => async (dispatch) => {
  const { shop } = newBike;
  await BikeService.createMeal(newBike);
  dispatch(listBikes(shop));
}

export const updateBike = (bikeId, updatedBike) => async (dispatch) => {
  const { shop } = updatedBike;
  delete updatedBike.shop;
  await BikeService.updateBike(bikeId, updatedBike);
  dispatch(listBikes(shop));
}

export const deleteBike = (bikeId, shopId) => async (dispatch) => {
  await BikeService.deleteMeal(bikeId);
  dispatch(listBikes(shopId));
}
