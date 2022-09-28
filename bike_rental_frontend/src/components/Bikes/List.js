import React from 'react'

import { Container, Row, Col } from "reactstrap";
import Card from './Card';

export default function BikeList({ bikes = [], onDelete, onEdit }) {

  return (
      <div className="pt-5 w-100">
        <Container fluid className="pt-7">
          <Row sm="1" md="2">
            {console.log(bikes)}
            { 
              bikes.map((bike, index) => (
                <Col key={index} className="pb-2">
                  <Card bike={bike} onDelete={onDelete} onEdit={onEdit} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>

  )
}
 