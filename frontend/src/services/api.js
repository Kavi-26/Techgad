import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (data) => await axios.post(`${API_URL}/auth/register`, data);
export const login = async (data) => await axios.post(`${API_URL}/auth/login`, data);
export const getProducts = async () => await axios.get(`${API_URL}/products`);
