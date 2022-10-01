import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Button } from "reactstrap";
import InputGroup from "../InputGroup";

const base = {
    name: '',
    email: '',
    password: '',
    roles: 'user',
};

export default function FormModal({ isOpen, onClose, onConfirm, editValues }) {
    const [formValues, setFormValues] = useState(base);
    useEffect(() => {
        if (editValues) {
            setFormValues({
                name: editValues.name,
                email: editValues.email,
                password: editValues.password,
                roles: editValues.roles[0].name,
            });
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

    return (
        <Modal isOpen={isOpen}>
            <Form role="form" onSubmit={handleSubmit}>
                <ModalHeader>{editValues ? 'Edit' : 'New'} User</ModalHeader>
                <ModalBody>
                    <InputGroup icon="ni ni-app">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formValues.name}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup icon="ni ni-planet">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup icon="ni ni-pin-3">
                        <Input placeholder="User type" value={formValues.roles} name='roles' type="select" required onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                        </Input>
                    </InputGroup>
                    <InputGroup icon="ni ni-satisfied">
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
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
