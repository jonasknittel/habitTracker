export class HabitEntry {
    id: number;
    habitId: number;
    completedAt: Date;
    note?: string;

    constructor (id: number, habitId: number, completedAt: Date, note?: string) {
        this.id = id;
        this.habitId = habitId;
        this.completedAt = completedAt;
        this.note = note;
    }
}