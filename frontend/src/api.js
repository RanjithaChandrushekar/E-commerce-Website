import axios from 'axios';

const API = axios.create({
  baseURL: 'https://e-commerce-website-scwa.onrender.com/api', // Your live Render backend URL
});

// Automatically attach authorization token if it exists in local storage
API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  return req;
});

export default API;