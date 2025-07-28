export interface HabitEntry {
    id: number;
    habitId: number;
    completedAt: string; // ISO date string
    note?: string;
}