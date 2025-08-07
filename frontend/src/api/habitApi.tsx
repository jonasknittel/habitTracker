import axios from "axios";
import { API_BASE_URL } from './config';
import { Habit } from "../models/Habit";

export const getHabits = async(): Promise<Habit[]> => {
    const res = await axios.get(`${API_BASE_URL}/api/habits/`, { withCredentials: true});
    return res.data.map((h: any) => new Habit(h.id, h.name, h.frequency));
};

export const addHabit = async(): Promise <Habit> => {
    const data = {
        name: 'new Habit',
        frequency: 'daily'
    }

    const res = await axios.post(`${API_BASE_URL}/api/habits`, data, { withCredentials: true})

    return res.data;
}

export const saveHabit = async (habit: Habit): Promise<Habit> => {
    const res = await axios.put(`${API_BASE_URL}/api/habits/${habit.id}`, habit, {withCredentials: true})

    return res.data;
}

export const deleteHabit = async(id:number): Promise<Boolean> => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/api/habits/${id}`, {withCredentials: true});
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}