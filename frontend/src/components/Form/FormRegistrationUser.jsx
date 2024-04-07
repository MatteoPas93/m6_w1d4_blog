import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import axios from "axios";

const RegistrationForm = () => {
  const [validated, setValidated] = useState(false);
   // ! Creating the formData model.
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    birthday: "",
    avatar: "",
  });

  // ! POST request to create a new user.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
       const response =  await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/createAuthor`,
          formData
        );
        if (response.status === 404) {
          console.error("Page not Found", response.data);
          return;
        }
        if (response.status === 401) {
          console.error("No authorization", response.data);
          return;
        }
        if (response.status === 500) {
          console.error("Internal Server Error", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    setValidated(true);
  };

  const handleChange = (event) => {
    // ! I extract the name and value properties from the event.target object.
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3 flex-column ml-1">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            required
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            name="surname"
            required
            type="text"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            required
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            required
            type="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            name="birthday"
            required
            type="date"
            placeholder="Birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomCover">
          <Form.Label>Avatar</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
            <Form.Control
              name="avatar"
              type="text"
              placeholder="Avatar"
              value={formData.avatar}
              onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3 ml-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button className="ml-3" type="submit">
        Submit form
      </Button>
    </Form>
  );
};

export default RegistrationForm;
