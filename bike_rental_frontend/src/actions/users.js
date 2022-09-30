import UserService from '../services/UserService';
import ReservationService from '../services/ReservationService';

export const SET_USERS = 'SET_USERS';

const setUsers = (data) => ({
  type: SET_USERS,
  payload: data,
});


export const listUsers = () => async (dispatch) => {
  const users = await UserService.getUsers();
  dispatch(setUsers(users));
}

export const createUser = (newUser) => async (dispatch) => {
  await UserService.createUser(newUser);
  dispatch(listUsers());
}

export const updateUser = (UserId, editUser) => async (dispatch) => {
  await UserService.updateUser(UserId, editUser);
  dispatch(listUsers());
}

export const deleteUser = (UserId) => async (dispatch) => {
  await UserService.deleteUser(UserId);
  dispatch(listUsers());
}


export const reservationsByUsers = () => async (dispatch) => {
  const users = await ReservationService.byusers()
  dispatch(setUsers(users));
}