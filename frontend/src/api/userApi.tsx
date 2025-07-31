import axios from 'axios';
import { API_BASE_URL } from './config';


export const getUser = () => {
    return axios.get(`${API_BASE_URL}/api/users/`, { withCredentials: true});
};
