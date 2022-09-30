import Register from "./views/pages/Register.js";
import Login from "./views/pages/Login.js";
// manager routes
import Bikes from "./views/pages/manager/Bikes";
import Users from "./views/pages/manager/Users";
import Reservations from "./views/pages/manager/Reservations";

// users routes 
import userBikes from "./views/pages/user/Bikes";
// both
import BikeDetail from "./views/pages/manager/BikeDetail";


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
    icon: 'fas fa-motorcycle',
    component: Bikes,
  },
  {
    path: '/bike/:bikeId',
    name: 'Bike Detail',
    component: BikeDetail,
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'fas fa-users',
    component: Users,
  },
  {
    path: '/reservations',
    name: 'Users Reservations',
    icon: 'fa-brands fa-sellsy',
    component: Reservations,
  },
  {
    path: '/reservations',
    name: 'Reserved Bikes',
    icon: 'fa-solid fa-boxes-packing ',
    component: Reservations,
  },
  
];

export const client = [
  {
    path: '/bikes',
    name: 'Bikes',
    icon: 'fas fa-motorcycle',
    component: userBikes,
  },
  {
    path: '/bike/:bikeId',
    name: 'Bike Details',
    component: BikeDetail,
  }
];
