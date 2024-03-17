import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { createPost } from '../../redux/posts/postSlice';
import { useDispatch } from 'react-redux';

function CreatePostForm() {
    const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    cover: "",
    category: "",
    content: ""
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
        dispatch(createPost(formData));
    }

    setValidated(true);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
        ...formData,
        [name]: value
    })
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Title</Form.Label>
          <Form.Control
          name = 'title'
            required
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Author</Form.Label>
          <Form.Control
          name = 'author'
            required
            type="text"
            placeholder="Author"
            value={formData.author.name}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomCover">
          <Form.Label>Cover</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
            <Form.Control
            name = 'cover'
              type="text"
              placeholder="Cover"
              value={formData.cover}
            onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomCategory">
          <Form.Label>Category</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
            <Form.Control
            name = 'category'
              type="text"
              placeholder="Category"
              value={formData.category}
            onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomContent">
          <Form.Label>Content</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
            <Form.Control
            name = 'content'
              type="text"
              placeholder="Content"
              value={formData.content}
            onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default CreatePostForm;