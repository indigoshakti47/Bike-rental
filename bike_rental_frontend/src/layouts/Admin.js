import React, { useState, useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux"
import { Container } from "reactstrap";
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar";
import useScrollTop from "../hooks/useScrollTop";
import * as helpers from './helpers';
import { manager, client } from "../routes";

function Admin(props) {
  const [routes, setRoutes] = useState([]);
  const auth = useSelector(state => state.auth);
  const mainContentRef = useScrollTop(props?.location?.pathname);

  useEffect(() => {
    if (auth.user?.roles && auth.user?.roles[0] === 'manager') {
      setRoutes(manager);
    } else {
      setRoutes(client);
    }
  }, [auth.token, auth.user?.roles]);

  if (!auth.token){
    return(
      <Redirect to="/auth/login"/>
    );
  };

  if (!routes.length) {
    return <></>;
  }

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        basePath="/admin"
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/logistico.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar
          {...props}
          brandText={helpers.getBrandText(routes, props.location)}
        />
        <Switch>
          {helpers.getRoutes(routes, '/admin')}
          <Redirect from="*" to="/admin/bikes" />
        </Switch>
        <Container fluid>
        </Container>
      </div>
    </>
  );
}

export default Admin;
