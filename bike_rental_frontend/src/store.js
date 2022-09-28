import { createStore, applyMiddleware } from "redux";

import reduxThunk from "redux-thunk";
import rootReducer from "./reducers/root";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'delivery',
  storage,
  whitelist: ['auth'],
};

const initialState = {
  auth: {},
  bikes: [],
  alerts: {},
  users: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = createStore(persistedReducer, initialState, applyMiddleware(reduxThunk));

export const Persistor = persistStore(Store);
