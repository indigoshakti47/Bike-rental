import Register from "./views/pages/Register.js";
import Login from "./views/pages/Login.js";
import Reservations from "./views/pages/Reservations";
import BikeDetail from "./views/pages/manager/BikeDetail";
import Bikes from "./views/pages/manager/Bikes";



export const AuthRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-primary",
    component: Register,
    layout: "/auth",
  },
];

export const manager = [
 
  {
    path: '/bikes',
    name: 'Bikes',
    icon: 'fas fa-utensils',
    component: Bikes,
  },
  {
    path: '/bike/:bikeId',
    name: 'Bike Detail',
    component: BikeDetail,
  },
  
  {
    path: '/reservations',
    name: 'Reservations',
    icon: 'ni ni-cart',
    component: Reservations,
  },
];

export const client = [

  {
    path: '/bike/:bikeId',
    name: 'Bike Details',
    component: BikeDetail,
  },
  {
    path: '/reservations',
    name: 'Reservations',
    icon: 'ni ni-cart',
    component: Reservations,
  },
];
