import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { Habit } from "../models/Habit";
import { useState } from "react";
import { createHabitEntry, getHabitEntriesById } from "../api/habitEntryApi";

type Props = {
    habit: Habit;
    enableEditing: (id: number) => void;
    saveEdit: (habit: Habit) => void;
    handleDeleteHabit: (id: number) => void;
    isEditing: boolean;
}

export default function CalendarCard({ 
                                    habit,
                                    enableEditing,
                                    saveEdit,
                                    handleDeleteHabit,
                                    isEditing
                                }: Props) {
    
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [dates, setDates] = useState<(Date | null)[]>(getHabitEntriesById(habit.id));
                                    
    const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const options=[
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
      ]

    const today = new Date();
    const weekday = today.getDay() === 0 ? 7 : today.getDay();

    const weekSunday = new Date(today);
    weekSunday.setDate(today.getDate() + (7 - weekday) % 7);

    const days: Date[][] = Array.from({ length: 25 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => {
            const i = (24 - row) * 7 + col;
            const date = new Date(weekSunday);
            date.setDate(date.getDate() - i);
            return date;
        })
    );

    const handleClick = async (day: Date) => {
        try {
            const res = await createHabitEntry(habit.id, day); // wirft bei Fehler
            if (res) {
                setDates(prev => [...prev, day]);
            }
        } catch (err) {
            console.error('Fehler beim Erstellen:', err);
        }
    }

    return (
        <Card style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection:"row", justifyContent: "space-between" }}>
                {/* isEditing CHECK */}
                {!isEditing ? (
                    <>
                        <div style={{ fontWeight: "bolder", fontSize: "2vw", marginBottom:"2vw"}}>{habit.name}</div>
                        <div style={{ fontWeight: "bolder", fontSize: "2vw", marginBottom:"2vw"}}>{habit.frequency}</div>
                        <Button style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "3vw", backgroundColor: "#D3D3D3"}}
                            onClick={() => (enableEditing(habit.id))}
                        >
                            <i className="pi pi-pencil inverted-icon" style={{filter: "invert(1)"}}></i>
                        </Button>
                    </>
                 ) : (
                    <>
                        <input 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={habit.name} 
                            style={{ fontWeight: "bolder", fontSize: "2vw", marginBottom:"2vw"}}
                        />
                        <Dropdown 
                            value={selectedValue} 
                            placeholder={habit.frequency} 
                            options={options}
                            onChange={(e) => setSelectedValue(e.value)}
                            style={{ fontWeight: "bolder", fontSize: "2vw", marginBottom:"2vw"}}
                        />
                        <div style={{ display: "flex", gap: "1vw" }}>
                            <Button style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "3vw", backgroundColor: "#D3D3D3"}}
                                onClick={() => {
                                    if (selectedValue != null) {
                                        habit.frequency = selectedValue;
                                    }

                                    if (inputValue != "") {
                                        habit.name = inputValue
                                    }
                                    (saveEdit(habit));
                                }}
                            >
                                <i className="pi pi-save" style={{filter: "invert(1)"}}></i>
                            </Button>
                            <Button style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "3vw", backgroundColor: "#D3D3D3"}}
                                onClick={() => {
                                    handleDeleteHabit(habit.id);
                                }}
                            >
                                <i className="pi pi-trash" style={{filter: "invert(1)"}}></i>
                            </Button>
                        </div>
                    </>
                 )}
            </div>
            <div style={{ border: "1px", display: "flex", justifyContent: "space-evenly", height: "20vw", width: "85vw", gap: "8px" }}>
                <div 
                    style={{ 
                        display: "flex", 
                        flexDirection:"column",
                        gap: "1vw",
                        justifyContent:"space-evenly", 
                        width: "4%",
                    }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} 
                            style={{ 
                                width: "100%", 
                                height:"13%", 
                                display: "flex",
                                alignItems: "center",
                                fontWeight: "bold",
                                fontSize: "1.5vw"
                            }}>{weekdays[i]}</div>
                    ))}
                </div>
                {Array.from({ length: 25 }).map((_, j) => (
                    <div key={j} style={{ display: "flex", flexDirection:"column", gap: "8px", alignItems:"center", justifyContent:"space-evenly", width: "3.5%" }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        (days[j][6 - i] <= today) ? (
                            <div 
                                key={i} 
                                onClick={() => {
                                    handleClick(days[j][6 - i]);
                                }}
                                role="button"
                                tabIndex={i}
                                
                                style={{ 
                                    backgroundColor: (dates.includes(days[j][6 - i])) ? "#FADF63" : "#D3D3D3", // random color generator
                                    width: "100%", 
                                    height:"13%", 
                                    borderRadius:"25%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign:"center",
                                    fontWeight: "bold",
                                    fontSize: "1.2vw",
                                    cursor: 'pointer'
                                }}>
                                    {days[j][6 - i].getDate()}
                                </div>
                         ) : (
                            <div key={i} 
                                style={{ 
                                    width: "90%", 
                                    height:"13%", 
                                    borderRadius:"25%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign:"center",
                                    fontWeight: "bold"
                                }}>
                                <div key={i}
                                    style={{
                                        width: ".5vw", 
                                        height:".5vw",
                                        borderRadius: "50%",
                                        backgroundColor: "#D3D3D3"
                                    }}>

                                    </div>
                                </div>
                                )
                    ))}
                    </div>
                ))}
            </div>
        </Card>
    );
}