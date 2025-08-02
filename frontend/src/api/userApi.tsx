import axios from 'axios';
import { API_BASE_URL } from './config';


export const getUser = () => {
    return axios.get(`${API_BASE_URL}/api/users/`, { withCredentials: true});
};

export const updateUser = (data: { name?: string, email?: string}) => {
    return axios.put(`${API_BASE_URL}/api/users/`, data, { withCredentials: true});
}

export const deleteUser = () => {
    return axios.delete(`${API_BASE_URL}/api/users/`);
}