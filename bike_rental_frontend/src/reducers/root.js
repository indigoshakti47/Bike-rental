import { combineReducers } from "redux";

import auth from "./auth";
import bikes from "./bikes";
import alerts from "./alerts";
import users from "./users";
import reservations from './reservation';
export default combineReducers({
    auth,
    bikes,
    alerts,
    users,
    reservations
});
