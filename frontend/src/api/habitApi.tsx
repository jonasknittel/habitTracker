import axios from "axios";
import { API_BASE_URL } from './config';

export const getHabits = () => {
    return axios.get(`${API_BASE_URL}/api/habits/`, { withCredentials: true});
};

export const addHabit = () => {
    const data = {
        name: 'new Habit',
        frequency: 'daily'
    }
    return axios.post(`${API_BASE_URL}/api/habits`, data, { withCredentials: true})
}