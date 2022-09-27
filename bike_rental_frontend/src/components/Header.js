import { Container, Row } from "reactstrap";

const Header = ({ children }) => {
  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          <Row className="d-flex justify-content-center">
            {children}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Header;
