export class Habit {
    name: string;
    frequency: string;
    id: number;

    constructor(name = 'new Habit', frequency = 'daily') {
        this.name = name;
        this.frequency = frequency;
        this.id = Date.now();
    }
}