import axios from 'axios';
const userData = JSON.parse(localStorage.getItem('token'));
const httpInstance = axios.create({
  baseURL: 'http://localhost:3001', // Set your API base URL
  headers: {
    'Content-Type': 'application/json', // Set default Content-Type
    Authorization: `Bearer ${userData.token}`, // Set default authorization token
  },
});

export default httpInstance;
