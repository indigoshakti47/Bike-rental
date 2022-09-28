import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp as registerAction } from "../../actions/auth";
import { useAlert } from "../../hooks/useAlert";
import InputGroup from "../../components/InputGroup";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";

const baseForm = {
  name: '',
  email: '',
  password: '',
  roles: 'user',
};

function Register() {
  const [formData, setFormData] = useState(baseForm);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleChange = (key) => (e) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerAction({
        ...formData,
        roles: [formData.roles],
      }))
    } catch (error) {
      console.log(error)
      alert('Something went wrong! Please try again', 'error');
    }
  };

  return <Container>
    <Row className="justify-content-center">
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-5">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center ">
              <Col xs="12">
                <h3 className="mb-0 text-center">USER REGISTER</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <InputGroup icon="ni ni-badge">
                <Input placeholder="Name" type="text" required onChange={handleChange('name')} />
              </InputGroup>
              <InputGroup icon="ni ni-email-83">
                <Input placeholder="Email" type="email" required onChange={handleChange('email')} />
              </InputGroup>
              <InputGroup icon="ni ni-circle-08">
                <Input placeholder="User type" type="select" required onChange={handleChange('roles')}>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </Input>
              </InputGroup>
              <InputGroup icon="ni ni-lock-circle-open">
                <Input placeholder="Password" type="password" required onChange={handleChange('password')} />
              </InputGroup>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="submit"
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
}

export default Register;
