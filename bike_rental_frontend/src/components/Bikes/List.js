import React from 'react'
import { Container, Row, Col, Button } from "reactstrap";
import Card from './Card';


export default function BikeList({ bikes = [], onDelete, onEdit, onReserve, changeStatus, role }) {

  return (
    <div className="pt-5 w-100">
      <Container fluid className="pt-7">
        {role === 'manager' &&
          <Row className='mb-3 col' >
            <Button color='success' onClick={() => { changeStatus({ status: "true" }) }}>available</Button>
            <Button color='danger' onClick={() => { changeStatus({ status: "false" }) }}>unavailable</Button>
          </Row>
        }
        <Row sm="1" md="2">
          {
            bikes.map((bike, index) => (
              <Col key={index} className="pb-2">
                <Card bike={bike} onDelete={onDelete} onEdit={onEdit} onReserve={onReserve} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>

  )
}
