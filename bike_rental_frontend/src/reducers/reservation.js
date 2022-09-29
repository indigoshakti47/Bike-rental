import { SET_RESERVATION } from '../actions/reservations';

const initialState = {
    reservations: []
};

const ReservationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESERVATION:
            return {
                ...state,
                reservations: action.payload,
            };
        default:
            return state;
    }
};

export default ReservationsReducer;
