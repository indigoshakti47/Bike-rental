import React from 'react';

import { Card, Button } from "reactstrap";

export default function UserCard({ user, onUnblock }) {

  return (
    <Card className="p-4 w-100 h-100">
      <div className="mb-3 d-flex flex-column align-items-center">
        <div className="d-flex align-items-center">
          <i className="fas fa-user-lock fa-2x"></i>
          <h2 className="pl-3 pt-2">{user.name}</h2>
        </div>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
      <Button color="primary" onClick={() => onUnblock(user._id)}>Unblock</Button>
    </Card>
  )
}
