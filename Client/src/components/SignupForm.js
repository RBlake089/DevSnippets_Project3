import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Button, Form, Alert } from 'react-bootstrap';
import '../styles.css'; // Import the styles.css file

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error }] = useMutation(ADD_USER);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the ADD_USER mutation with the form data
      await addUser({
        variables: { ...formData },
      });

      // Reset the form after successful submission
      setFormData({ username: '', email: '', password: '' });

      // Set the success message
      setSuccessMessage('User created successfully!');
      setErrorMessage('');
    } catch (error) {
      // Handle any errors that occur during the mutation
      setErrorMessage('Error creating user: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title ">Sign Up</h1>
      <Form className="signup-form" onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </Form.Group>
        {error && <Alert variant="danger" className="alert-danger">{error.message}</Alert>}
        {successMessage && <Alert variant="success" className="alert-success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger" className="alert-danger">{errorMessage}</Alert>}
        <Button type="submit" variant="gold" className="signup-button buttons">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
