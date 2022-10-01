import React, { useState, useEffect } from 'react'

import {
    Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Button, FormGroup,
    InputGroupAddon, InputGroupText, Col, Row
} from "reactstrap";
import ReactDatetime from "react-datetime";

import InputGroup from "../InputGroup";

const base = {
    totalAmount: '',
    startDate: '',
    endDate: '',
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

    const handleChange = (type, value) => {
        var date = value.toDate();
        setFormValues({
            ...formValues,
            [type]: date,
        });
    };
    const inputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Modal isOpen={isOpen}>
            <Form role="form" onSubmit={handleSubmit}>
                <ModalHeader>{editValues ? 'Edit' : 'New'} Reserve</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-calendar-grid-58" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <ReactDatetime
                                        className="red"
                                        inputProps={{
                                            placeholder: "State Date Here"
                                        }}
                                        value={formValues.startDate}
                                        timeFormat={true}
                                        onChange={e => handleChange('startDate', e)}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-calendar-grid-58" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <ReactDatetime
                                        inputProps={{
                                            placeholder: "End Date Here"
                                        }}
                                        value={formValues.endDate}
                                        onChange={e => handleChange('endDate', e)}
                                        timeFormat={true}
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <InputGroup icon="ni ni-money-coins">
                        <Input
                            type="number"
                            name="totalAmount"
                            placeholder="Total amount"
                            value={formValues.location}
                            onChange={inputChange}
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
