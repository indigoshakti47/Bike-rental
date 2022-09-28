import { combineReducers } from "redux";

import auth from "./auth";
import bikes from "./bikes";
import alerts from "./alerts";

export default combineReducers({
    auth,
    bikes,
    alerts,
});
