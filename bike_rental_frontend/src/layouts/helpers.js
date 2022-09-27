import React from 'react';

import { Route } from "react-router-dom";

export const getRoutes = (routes, baseRoute) => {
  const RouteComponents = routes.map((route, key) => {
    return (
      <Route
       path={baseRoute + route.path}
       component={route.component}
       key={key}
       exact
       strict
      />
    );
  });

  return RouteComponents;
};

export const getBrandText = (routes, propLocation) => {
  for (let i = 0; i < routes.length; i++) {
    if (
      propLocation.pathname.indexOf(
        routes[i].layout + routes[i].path
      ) !== -1
    ) {
      return routes[i].name;
    }
  }

  return "Brand";
};
