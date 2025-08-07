import { HabitEntry } from "./HabitEntry";

export class Habit {
    id: number;
    name: string;
    frequency: string;
    habitEntries: HabitEntry[] = [];

    constructor(id: number, name: string, frequency: string, habitEntries: HabitEntry[] = []) {
        this.id = id;
        this.name = name;
        this.frequency = frequency;
        this.habitEntries = habitEntries;
    }

    getDates = (): (Date | null)[] => {
        return this.habitEntries.map((item) => item.completedAt ? new Date(item.completedAt) : null)

    }
}