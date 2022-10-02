import React from 'react'

import { useSelector } from 'react-redux';

import { Container, Card, Button } from 'reactstrap';

export default function EmptyState({ item }) {
  return (
    <Container>
      <Card className="p-5">
        <div className="d-flex flex-column align-items-center">
          <i className="fas fa-broom fa-3x"></i>
       
              <h2 className="py-4">We are sorry, we don't have any {item} yet :(</h2>
          
        </div>
      </Card>
    </Container>
  )
}
