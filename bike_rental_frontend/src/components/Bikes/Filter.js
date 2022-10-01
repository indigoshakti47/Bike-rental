import React, { useState } from "react";
import { Row, Button, Label, Input } from "reactstrap";
const base = {
    model: '',
    color: '',
    location: '',
    rating: '1',
};

export default function Filter({search}) {
    const [formValues, setFormValues] = useState(base);

   
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };
    const handleRating = () => {
        search({rating: formValues.rating});
    }
    const handleInfo = () => {
        search({model: formValues.model, color: formValues.color, location: formValues.location});
    }
    return (
        <div className="text-white pl-4 pr-4" >
            <Row>
                <div className="col-md-3 pt-1 pb-1">
                    <Label className="visually-hidden ">
                        Model
                    </Label>
                    <Input name="model" placeholder="Model" type="text" onChange={handleChange}/>
                </div>
                <div className="col-md-3 pt-1 pb-1">
                    <Label className="visually-hidden ">
                        Color
                    </Label>
                    <Input name="color" placeholder="Color" type="text" onChange={handleChange}/>
                </div>
                <div className="col-md-3 pt-1 pb-1">
                    <Label className="visually-hidden">
                        Location
                    </Label>
                    <Input name="location" placeholder="Location" type="text" onChange={handleChange}/>
                </div>
                <div className="col mt-auto pt-1 pb-1 mt-auto">
                    <Button color='success' onClick={handleInfo}>
                        Search
                    </Button>
                </div>
            </Row>
            <h2 className="d-flex align-items-center justify-content-center mt-2">
                OR
            </h2>
            <Row className="d-flex align-items-center justify-content-center">
                <div className="col-md-4 pt-1 pb-1 mt-2">
                    <Label className="visually-hidden">
                        Rating
                    </Label>
                    <Input type="select" name="rating" onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </Input>
                </div>
                <div className=" pt-1 pb-1 mt-auto">
                    <Button color='success' onClick={handleRating}>
                        Search
                    </Button>
                </div>
            </Row>
        </div>
    );
}