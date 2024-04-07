import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const UpdateCoverForm = ({ postId, onUpdateCover }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    cover: "",
  });

  // ! PATCH request to change the cover of a specific post.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
       const response =  await axios.patch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${postId}/cover`,
          formData
        );
        if (response.status === 404) {
          console.error("Post not Found", response.data);
          return;
        }
        if (response.status === 401) {
          console.error("No authorization", response.data);
          return;
        }
        if (response.status === 500) {
          console.error("Internal Server Error", response.data);
        }
        onUpdateCover(postId)
      } catch (error) {
        console.error(error);
      }
    }

    setValidated(true);
  };

  const handleChange = (event) => {
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
          <Form.Label>Cover</Form.Label>
          <Form.Control
            name="cover"
            required
            type="text"
            placeholder="cover"
            value={formData.cover}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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

export default UpdateCoverForm;
