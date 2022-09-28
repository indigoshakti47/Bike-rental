import React from 'react'

import { useSelector } from 'react-redux';
import { Container } from "reactstrap";

import Header from "../Header.js";

export default function CardContainer({ title, children }) {
  const role = useSelector(state => state.auth.role);
  return (
    <>
      <Header>
        <h1 className="display-2 text-white text-center">
          {title}
        </h1>
      </Header>
      <Container className="pt-5 pb-4" fluid>
        { children }
      </Container>
    </>
  )
}
