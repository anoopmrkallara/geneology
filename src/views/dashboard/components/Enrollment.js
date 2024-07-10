import React, { useState, useEffect } from 'react';
import httpInstance from '../../../header/HttpInstance';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import SuccessSnackbar from 'src/components/shared/SuceessNotification';
import ErrorSnackbar from 'src/components/shared/ErrorNotification';
import { useLocation } from 'react-router-dom';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    country: 'India',
    language: '',
    mobileNumber: '',
    bankDetails: {
      ifscCode: '',
      bankName: '',
      branchName: '',
      accountHolderName: '',
      accountNumber: '',
      confirmAccountNumber: '',
    },
    dateOfBirth: '',
    panNumber: '',
    distributorName: '',
    gender: '',
    profession: '',
    town: '',
    state: '',
    district: '',
    aadharNumber: '',
    pincode: '',
    emailAddress: '',
    nomineeName: '',
    relationship: '',
    password: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState({});
  const [emailExist, setEmailExist] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [childCount, setChildCount] = useState(0);
  const location = useLocation();
  const { data, position } = location.state || {};
  const checkChilds = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found in local storage');

      const userDetails = JSON.parse(token);
      if (!userDetails || !userDetails.id) throw new Error('Invalid user details');

      const response = await httpInstance.get(`/get-child-count/${userDetails.id}`);
      if (response && response.data) {
        setChildCount(Array.isArray(response.data) ? response.data.length : 0);
      } else {
        setChildCount(0);
      }
    } catch (error) {
      console.error('Error fetching child count:', error.message || error);
      setChildCount(0);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Basic Information validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    if (!formData.language) {
      newErrors.language = 'Language is required';
      isValid = false;
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
      isValid = false;
    }
    if (!formData.emailAddress) {
      newErrors.emailAddress = 'Email Address is required';
      isValid = false;
    }

    // Bank Details validation
    if (!formData.bankDetails.ifscCode) {
      newErrors.ifscCode = 'IFSC Code is required';
      isValid = false;
    }
    if (!formData.bankDetails.bankName) {
      newErrors.bankName = 'Bank Name is required';
      isValid = false;
    }
    if (!formData.bankDetails.branchName) {
      newErrors.branchName = 'Branch Name is required';
      isValid = false;
    }
    if (!formData.bankDetails.accountHolderName) {
      newErrors.accountHolderName = 'Account Holder Name is required';
      isValid = false;
    }
    if (!formData.bankDetails.accountNumber) {
      newErrors.accountNumber = 'Account Number is required';
      isValid = false;
    }
    if (!formData.bankDetails.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Confirm Account Number is required';
      isValid = false;
    }

    // Personal Details validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
      isValid = false;
    }
    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN Number is required';
      isValid = false;
    }
    if (!formData.distributorName) {
      newErrors.distributorName = 'Distributor Name is required';
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }
    if (!formData.profession) {
      newErrors.profession = 'Profession is required';
      isValid = false;
    }

    // Address Details validation
    if (!formData.town) {
      newErrors.town = 'Town is required';
      isValid = false;
    }
    if (!formData.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    if (!formData.district) {
      newErrors.district = 'District is required';
      isValid = false;
    }
    if (!formData.aadharNumber) {
      newErrors.aadharNumber = 'Aadhar Number is required';
      isValid = false;
    }
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
      isValid = false;
    }
    if (!formData.nomineeName) {
      newErrors.nomineeName = 'Nominee Name is required';
      isValid = false;
    }
    if (!formData.relationship) {
      newErrors.relationship = 'Relationship with Nominee is required';
      isValid = false;
    }
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = 'Confrim Password is required';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePAN = (panNumber) => {
    const panRegex = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}/;
    return panRegex.test(panNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'emailAddress') {
      validateEmail(value)
        ? setErrors((prevState) => ({ ...prevState, [name]: '' }))
        : setErrors((prevState) => ({ ...prevState, [name]: 'Invalid email address' }));
    }

    if (name === 'panNumber') {
      const uppercaseValue = value.toUpperCase();
      setFormData((prevState) => ({ ...prevState, [name]: uppercaseValue }));
      validatePAN(uppercaseValue)
        ? setErrors((prevState) => ({ ...prevState, [name]: '' }))
        : setErrors((prevState) => ({ ...prevState, [name]: 'Invalid PAN Number' }));
    }
  };

  const handleEmailBlur = async (e) => {
    const { value } = e.target;
    try {
      const res = await httpInstance.get(`/checkEmail/${value}`);
      if (res.data === 'Exist') {
        setEmailExist('Email Already Exists');
      } else {
        setEmailExist('');
      }
    } catch (error) {
      console.error('Error checking email:', error.message || error);
      setEmailExist('');
    }
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      bankDetails: {
        ...prevState.bankDetails,
        [name]: value,
      },
    }));

    if (name === 'confirmAccountNumber') {
      value === formData.bankDetails.accountNumber
        ? setErrors((prevState) => ({ ...prevState, [name]: '' }))
        : setErrors((prevState) => ({ ...prevState, [name]: 'Account Number not matching' }));
    }

    if (name === 'accountNumber') {
      const name2 = 'confirmAccountNumber';
      value === formData.bankDetails.confirmAccountNumber ||
      !formData.bankDetails.confirmAccountNumber
        ? setErrors((prevState) => ({ ...prevState, [name2]: '' }))
        : setErrors((prevState) => ({ ...prevState, [name2]: 'Account Number not matching' }));
    }

    if (name === 'password') {
      const name2 = 'confirmpassword';
      value === formData.confirmpassword || !formData.confirmpassword
        ? setErrors((prevState) => ({ ...prevState, [name2]: '' }))
        : setErrors((prevState) => ({
            ...prevState,
            [name2]: 'Password and Confirm password must be same',
          }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && emailExist === '') {
      try {
        const res = await httpInstance.post(`/customer/register`, formData);
        if (res) {
          setSuccessMessage('User registered successfully');
        } else {
          setErrorMessage('Something went wrong, please try again later');
        }
      } catch (error) {
        console.error('Error registering user:', error.message || error);
        setErrorMessage(
          error.response ? error.response.data : 'Something went wrong, please try again later',
        );
      }
    } else {
      setErrorMessage('Validation issues, please check the form');
    }
  };

  useEffect(() => {
    checkChilds();
  }, []);

  if (childCount >= 2) {
    return (
      <PageContainer title="Register Customer" description="Register new customer details">
        <Typography variant="h2" fontWeight="700" mt="-20px">
          Customer Enrollment
        </Typography>
        <h2>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Action not allowed. Both left and right relations are already enrolled.
          </Alert>
        </h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Register Customer" description="Register new customer details">
      <Typography variant="h2" fontWeight="700" mt="-20px">
        Customer Enrollment
      </Typography>
      <form onSubmit={handleSubmit}>
        <DashboardCard>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.country}>
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  label="Country"
                >
                  <MenuItem value="India">India</MenuItem>
                  {/* Add more countries as needed */}
                </Select>
                {errors.country && (
                  <Typography variant="caption" color="error">
                    {errors.country}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.language}>
                <InputLabel>Language</InputLabel>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  label="Language"
                >
                  <MenuItem value="Tamil">Tamil</MenuItem>
                  <MenuItem value="Malayalam">Malayalam</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                  <MenuItem value="Kannada">Kannada</MenuItem>
                </Select>
                {errors.language && (
                  <Typography variant="caption" color="error">
                    {errors.language}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                error={!!errors.emailAddress || !!emailExist}
                helperText={errors.emailAddress}
              />
              {emailExist && (
                <Typography variant="caption" color="error">
                  {emailExist}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DashboardCard>
        <DashboardCard>
          <Typography variant="h6" gutterBottom>
            Personal Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Distributor Name"
                name="distributorName"
                value={formData.distributorName}
                onChange={handleChange}
                error={!!errors.distributorName}
                helperText={errors.distributorName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography variant="caption" color="error">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="PAN Number"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                error={!!errors.panNumber}
                helperText={errors.panNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Aadhar Number"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                error={!!errors.aadharNumber}
                helperText={errors.aadharNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                error={!!errors.profession}
                helperText={errors.profession}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nominee Name"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
                error={!!errors.nomineeName}
                helperText={errors.nomineeName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Relationship with Nominee"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                error={!!errors.relationship}
                helperText={errors.relationship}
              />
            </Grid>
          </Grid>
        </DashboardCard>
        <DashboardCard>
          <Typography variant="h6" gutterBottom>
            Address Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="town"
                value={formData.town}
                onChange={handleChange}
                error={!!errors.town}
                helperText={errors.town}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                error={!!errors.district}
                helperText={errors.district}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
          </Grid>
        </DashboardCard>
        <DashboardCard>
          <Typography variant="h6" gutterBottom>
            Bank Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formData.bankDetails.ifscCode}
                onChange={handleBankDetailsChange}
                error={!!errors.ifscCode}
                helperText={errors.ifscCode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bankName"
                value={formData.bankDetails.bankName}
                onChange={handleBankDetailsChange}
                error={!!errors.bankName}
                helperText={errors.bankName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Branch Name"
                name="branchName"
                value={formData.bankDetails.branchName}
                onChange={handleBankDetailsChange}
                error={!!errors.branchName}
                helperText={errors.branchName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formData.bankDetails.accountHolderName}
                onChange={handleBankDetailsChange}
                error={!!errors.accountHolderName}
                helperText={errors.accountHolderName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formData.bankDetails.accountNumber}
                onChange={handleBankDetailsChange}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Confirm Account Number"
                name="confirmAccountNumber"
                value={formData.bankDetails.confirmAccountNumber}
                onChange={handleBankDetailsChange}
                error={!!errors.confirmAccountNumber}
                helperText={errors.confirmAccountNumber}
              />
            </Grid>
          </Grid>
        </DashboardCard>
        <DashboardCard>
          <Typography variant="h6" gutterBottom>
            Password
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                error={!!errors.confirmpassword}
                helperText={errors.confirmpassword}
              />
            </Grid>
          </Grid>
        </DashboardCard>
        <DashboardCard>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </DashboardCard>
      </form>
      <SuccessSnackbar
        open={!!successMessage}
        message={successMessage}
        onClose={() => setSuccessMessage('')}
      />
      <ErrorSnackbar
        open={!!errorMessage}
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </PageContainer>
  );
};

export default RegisterForm;
