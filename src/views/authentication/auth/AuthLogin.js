import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear validation error when the user starts typing in the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`http://localhost:3001/login`, formData);
        const token = response.data;
        // Store the token in local storage or session storage
        localStorage.setItem('token', JSON.stringify(token));
        navigate('/pages/dashboard');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Unauthorized - Invalid credentials
          setErrors({ ...errors, login: 'Invalid username or password' });
        } else {
          console.log('Error:', error);
          errors.login = 'Password is required';
          setErrors({ ...errors, login: 'An error occurred while logging in' });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const validateForm = (formData) => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}

        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.login && <div className="invalid-feedback">{errors.login}</div>}
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </Box>
        </Stack>
        <br></br>
        <Box className="s12">
          {/* Attach the handleSignIn function to the button's onClick event handler */}
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
        {subtitle}
      </form>
    </>
  );
};

export default AuthLogin;
