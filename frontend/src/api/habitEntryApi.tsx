import axios from "axios";
import { API_BASE_URL } from './config';

export const createHabitEntry = async (habitId: number, day: Date) => {
    const res = await axios.post(`${API_BASE_URL}/api/habits/${habitId}/entries`, { day: day.toISOString() }, { withCredentials: true });
    return res;
}

export const getHabitEntriesById = async (habitId: number) => {
    const res = await axios.get(`${API_BASE_URL}/api/habits/${habitId}/entries`, { withCredentials: true });
    return res;
}
