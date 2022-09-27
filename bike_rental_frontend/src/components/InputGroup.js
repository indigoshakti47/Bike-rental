import React from 'react'

import {
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormGroup
} from "reactstrap";

export default function DeliveryInputGroup({ children, icon }) {
  return (
    <FormGroup>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={icon} />
          </InputGroupText>
        </InputGroupAddon>
        {children}
      </InputGroup>
    </FormGroup>
  )
}
