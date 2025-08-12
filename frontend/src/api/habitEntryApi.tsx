import axios from "axios";
import { API_BASE_URL } from './config';
import { HabitEntry } from "../models/HabitEntry";

interface HabitEntryJSON {
  id: number;
  habitId: number;
  completedAt: string;
  note: string;
}

export const createHabitEntry = async (habitId: number, day: Date) => {
    console.log(`creating HabitEntry at: ${day}`);
    const res = await axios.post(`${API_BASE_URL}/api/habits/${habitId}/entries`, { day: day.toISOString() }, { withCredentials: true });
    return res;
}

export const getHabitEntriesById = async (habitId: number): Promise<Date[]> => {
    console.log('getHabitEntriesById()');
    const res = await axios.get<HabitEntryJSON[]>(`${API_BASE_URL}/api/habits/${habitId}/entries`, { withCredentials: true });
    
    const dates = res.data.map(input => new Date(input.completedAt));
    dates.map((input) => console.log(input.toDateString()));
    return dates;
}

export const deleteHabitEntry = async (habitId: number, day: Date) => {
    const res = await axios.delete<HabitEntryJSON[]>(`${API_BASE_URL}/api/habits/${habitId}/entries`, {
            data: {
                day: day.toISOString().split("T")[0]
            },
             withCredentials: true 
        });
    return res;
}