import React, { useState, useEffect } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Button, FormGroup, Label } from "reactstrap";

import InputGroup from "../InputGroup";

const base = {
    model: '',
    color: '',
    location: '',
    status: ''
};

export default function FormModal({ isOpen, onClose, onConfirm, editValues }) {
    const [formValues, setFormValues] = useState(base);
    useEffect(() => {
        if (editValues) {
            setFormValues(editValues);
        } else {
            setFormValues(base);
        }
    }, [editValues])

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formValues);
    };

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };
    const CheckhandleChange = (e) => {
        if (e.target.checked) {
            setFormValues({
                ...formValues,
                [e.target.name]: 'true',
            });
        } else {
            setFormValues({
                ...formValues,
                [e.target.name]: 'false',
            });
        }

    }

    return (
        <Modal isOpen={isOpen}>
            <Form role="form" onSubmit={handleSubmit}>
                <ModalHeader>{editValues ? 'Edit' : 'New'} Bike</ModalHeader>
                <ModalBody>
                    <InputGroup icon="ni ni-app">
                        <Input
                            type="text"
                            name="model"
                            placeholder="Model"
                            value={formValues.model}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup icon="ni ni-planet">
                        <Input
                            type="text"
                            name="color"
                            placeholder="Color"
                            value={formValues.color}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup icon="ni ni-pin-3">
                        <Input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formValues.location}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <FormGroup >
                        <Input
                            type="checkbox"
                            name="status"
                            value='true'
                            placeholder="Status"
                            checked={formValues.status === 'true'}
                            onChange={CheckhandleChange}
                        />
                        <Label
                            for="exampleCheckbox"
                        >
                            availability
                        </Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        {editValues ? 'Edit' : 'Create'}
                    </Button>
                    <Button color="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}
