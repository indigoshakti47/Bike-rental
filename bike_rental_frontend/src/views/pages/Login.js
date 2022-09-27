import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn as loginAction } from "../../actions/auth";
import InputGroup from "../../components/Forms/InputGroup";
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Col
} from "reactstrap";
import { useAlert } from "hooks/useAlert";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleChange = (key) => (e) => {
    setFormData({
      ...formData,
      [key]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginAction(formData));
    } catch (error) {
      alert('Wrong user or password.', 'error');
    }
  } 

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Sign in with credentials</small>
          </div>
          <Form role="form" onSubmit={handleLogin}>
            <InputGroup icon="ni ni-email-83">
                <Input placeholder="Email" type="email" required onChange={handleChange('email')} />
            </InputGroup>
            <InputGroup icon="ni ni-lock-circle-open">
                <Input placeholder="Password" type="password" required onChange={handleChange('password')} />
            </InputGroup>
            <div className="text-center">
              <Button
                className="my-4"
                color="primary"
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Login;
