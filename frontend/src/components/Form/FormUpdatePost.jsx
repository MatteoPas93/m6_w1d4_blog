import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";

const UpdatePostForm = ({ postId }) => {
  // !I create the formData model.
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
    comments: [],
  });

  // !Function for requesting GET of specific post.
  const fetchPost = async ({ postId }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getPost/${postId}`
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

      const postData = response.data;
      setFormData(postData);
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  const handleChange = (event) => {
    // ! I extract the name and value properties from the event.target object.
    const { name, value } = event.target;
    // ! Having to update the author sub-object, I check if the element name begins with author.
    if (name.startsWith("author.")) {
      setFormData((prevState) => ({
        ...prevState,
        author: {
          ...prevState.author,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // ! Function with PATCH request for editing the post upon clicking submit.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postIdValue = formData._id;
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/updatePost/${postIdValue}`,
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
            value={formData.readTime}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="author.name"
            required
            type="text"
            value={formData.author.name}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            name="author.avatar"
            required
            type="text"
            value={formData.author.avatar}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom07">
          <Form.Label>Content</Form.Label>
          <Form.Control
            name="content"
            required
            type="text"
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
