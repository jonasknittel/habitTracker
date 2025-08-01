import axios from 'axios';
import { API_BASE_URL } from './config';


export const getUser = () => {
    return axios.get(`${API_BASE_URL}/api/users/`, { withCredentials: true});
};

export const updateUser = (id: number) => {
    return axios.put(`${API_BASE_URL}/api/user/${id}`);
}

export const deleteUser = (id: number) => {
    return axios.delete(`${API_BASE_URL}/api/user/${id}`);
}