import React from 'react'

import { useSelector } from 'react-redux';
import { Container } from "reactstrap";

import Header from "../Header.js";

export default function ReservationsContainer({ children }) {
  const role = useSelector(state => state.auth.role);
  return (
    <>
      <Header>
        <h1 className="display-2 text-white text-center">
          { role === 'manager' ?
            'Manage your reservations' :
            'Watch the progress of your reservations'
          }
        </h1>
      </Header>
      <Container className="pt-5 pb-4" fluid>
        { children }
      </Container>
    </>
  )
}
