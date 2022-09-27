import React from 'react'

import { useSelector } from 'react-redux';

import { Container, Card, Button } from 'reactstrap';

export default function EmptyState({ item, onActionClick }) {
  const role = useSelector((state) => state.auth.role);

  return (
    <Container>
      <Card className="p-5">
        <div className="d-flex flex-column align-items-center">
          <i className="fas fa-broom fa-3x"></i>
          {
            role === 'restaurant' ? (
              <h2 className="py-4">You dont have any {item} yet!</h2>
            ) : (
              <h2 className="py-4">We are sorry, we don't have any {item} yet :(</h2>
            )
          }
          { role === 'restaurant' && !!onActionClick && <Button color="primary" onClick={onActionClick}>Add new {item}</Button> }
        </div>
      </Card>
    </Container>
  )
}
