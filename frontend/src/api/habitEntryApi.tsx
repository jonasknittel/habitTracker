import axios from "axios";
import { API_BASE_URL } from './config';

export const createHabitEntry = async () => {
    const res = await axios.post(`${API_BASE_URL}/api/habits`, { withCredentials: true })
    return res;
}

export const getHabitEntry = () => {

}