import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Store, Persistor } from "./store";

import "./global.css"
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import DeliveryToast from "./components/SharedComponents/DeliveryToast";


function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" to="/admin/restaurants" />
          </Switch>
        </BrowserRouter>
        <DeliveryToast text="Some text" status="success" />
      </PersistGate>
    </Provider>
  );
}

export default App;
