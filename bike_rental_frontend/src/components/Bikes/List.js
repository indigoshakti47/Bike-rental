import React from 'react'

import { Container, Row, Col } from "reactstrap";
import Card from './Card';


export default function BikeList({ bikes = [], onDelete, onEdit, onReserve }) {

  return (
      <div className="pt-5 w-100">
        <Container fluid className="pt-7">
          <Row sm="1" md="2">
            { 
              bikes.map((bike, index) => (
                <Col key={index} className="pb-2">
                  <Card bike={bike} onDelete={onDelete} onEdit={onEdit} onReserve={onReserve}/>
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>

  )
}
 