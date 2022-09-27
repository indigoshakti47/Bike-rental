import React from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function ConfirmationDialog({
  text = 'Are you sure you want to do this ?',
  onConfirm,
  onCancel,
  isOpen,
  buttonColor = "danger"
}) {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Warning!</ModalHeader>
      <ModalBody>
        <span>{text}</span>
        <br />
      </ModalBody>
      <ModalFooter>
        <Button color={buttonColor} onClick={onConfirm}>
          Confirm
        </Button>{" "}
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
