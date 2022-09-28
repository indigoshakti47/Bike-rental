import React from 'react'

import { Container, Row, Col } from "reactstrap";
import Card from './Card';

export default function List({ users = [], onDelete, onEdit }) {

  return (
      <div className="pt-5 w-100">
        <Container fluid className="pt-7">
          <Row sm="1" md="2">
            { 
              users.map((user, index) => (
                <Col key={index} className="pb-2">
                  <Card user={user} onDelete={onDelete} onEdit={onEdit} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>

  )
}
 