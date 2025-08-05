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
}