import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";

const UpdatePostForm = ({ postId, onUpdate }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    cover: "",
    readTime: "",
    author: {
      name: "",
      avatar: "",
    },
    content: "",
    comments: []
  });

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getPost/${postId}`
      );
      const {category, title, cover, readTime, author, content, comments} = response.data
      setFormData({
          category,
          title,
          cover,
          readTime,
          author: {
            name: author.name,
            avatar: author.avatar
          },
          content,
          comments
        })
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/updatePost/${postId}`,
        formData
      );
      onUpdate();
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3 flex-column ml-1">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            required
            type="text"
            // placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            type="text"
            // placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            name="cover"
            required
            type="text"
            // placeholder="Cover"
            value={formData.cover}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Read Time</Form.Label>
          <Form.Control
            name="readTime"
            required
            type="number"
            // placeholder="Read Time"
            value={formData.readTime}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            required
            type="text"
            // placeholder="Name"
            value={formData.author.name}
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
              value={formData.author.avatar}
              onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Content</Form.Label>
          <Form.Control
            name="content"
            required
            type="text"
            // placeholder="content"
            value={formData.content}
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

export default UpdatePostForm;
