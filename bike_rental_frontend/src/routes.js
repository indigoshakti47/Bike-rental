import Register from "./views/pages/Register.js";
import Login from "./views/pages/Login.js";
import BikeDetail from "./views/pages/manager/BikeDetail";
import Bikes from "./views/pages/manager/Bikes";
import Users from "./views/pages/manager/Users";




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
  
];

export const client = [

  {
    path: '/bike/:bikeId',
    name: 'Bike Details',
    component: BikeDetail,
  }
];
