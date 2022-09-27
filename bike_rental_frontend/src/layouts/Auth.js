import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux"
import Logo from "../assets/img/brand/logistico.png"
import AuthNavbar from "../components/Navbars/AuthNavbar.js";
import { AuthRoutes as routes } from "../routes";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    if(
      this.props.auth.token
    ){
      return(
        <Redirect to="/admin/user-profile"/>
      )
    }
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header py-7 py-lg-8">
          <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="3" md="4">
                    <img width="120px;" src={Logo} alt="Logo"></img>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
          <Container className="mt--9 pb-4">
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps=
state=>({
  ...state
})
export default connect(
  mapStateToProps,
  {}
)(Auth);
