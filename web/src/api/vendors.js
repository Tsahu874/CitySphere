// src/api/vendors.js
import axios from 'axios';
const API = 'http://localhost:5000'; // backend base URL

export const getVendors = () => axios.get(`${API}/vendors`).then(r => r.data);
export const addVendor = (vendor) => axios.post(`${API}/vendors`, vendor).then(r => r.data);
export const updateVendor = (id, vendor) => axios.put(`${API}/vendors/${id}`, vendor).then(r => r.data);
export const deleteVendor = (id) => axios.delete(`${API}/vendors/${id}`).then(r => r.data);
