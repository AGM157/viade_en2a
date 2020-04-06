import React, { Component } from "react";
import { useTranslation } from 'react-i18next';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormWrapper } from "./lateralForm.style";


export default class LateralForm extends Component<Props>{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormWrapper>
            <Form onSubmit={this.props.handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label className="label">Nombre de la ruta</Form.Label>

                    <Form.Control
                        required
                        type="text"
                        placeholder="nombre"
                        defaultValue={this.props.name}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            this.props.setName(x.currentTarget.value);
                         } }
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formSurname">
                    <Form.Label className="label">Descripción</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows="3"
                        defaultValue={this.props.description}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            this.props.setDescription(x.currentTarget.value);
                         } }                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear
                </Button>
            </Form>
            </FormWrapper>
        );
    }

}
