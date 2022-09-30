import ReservationService from '../services/ReservationService';

export const SET_RESERVATION = 'SET_RESERVATION';



const getReservation = (data) => ({
  type: SET_RESERVATION,
  payload: data,
});



export const listReservations = (bikeId, params) => async (dispatch) => {
    const reservations = await ReservationService.index(bikeId, params || {});
    dispatch(getReservation(reservations));
  }

export const create = (bikeId, data) => async (dispatch) => {
  await ReservationService.create(bikeId, data);
}

export const update = (reservation, params) => async (dispatch) => {
  await ReservationService.update(reservation, params);
  dispatch(listReservations(params.bike, params));

}
