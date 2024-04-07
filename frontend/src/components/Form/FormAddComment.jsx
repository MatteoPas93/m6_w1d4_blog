import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";

const AddCommentForm = ({ postId }) => {
  // ! Creating the formData model.
  const [formData, setFormData] = useState({
    user: "",
    comment: "",
    date: "",
  });

  // ! POST request for adding comments to a specific post.
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}`,
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
    } catch (error) {
      console.error(error);
    }
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
    <Form onSubmit={handleClick}>
      <Row className="mb-3 flex-column ml-1">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>User</Form.Label>
          <Form.Control
            name="user"
            required
            type="text"
            placeholder="Enter your name"
            value={formData.user}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            name="comment"
            required
            type="text"
            placeholder="Add comment"
            value={formData.comment}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Date</Form.Label>
          <Form.Control
            name="date"
            required
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className="ml-3" type="submit">
        Send comment
      </Button>
    </Form>
  );
};

export default AddCommentForm;
