import { Card } from "primereact/card";

import styles from "./CalendarCard.module.css";

export default function CalendarCard() {

    const status = true;
    const weekdays = ["mo", "tu", "wed", "thu", "fri", "sat", "sun"];

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


    return (
        <Card style={{ display: "flex", justifyContent: "center"}}>
            <div style={{ backgroundColor: "yellow", display: "flex", justifyContent: "space-evenly", height: "20vw", width: "85vw" }}>
                <div style={{ display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"space-evenly", backgroundColor: "red", width: "3%" }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div style={{ backgroundColor: "green"}}>{weekdays[i]}</div>
                    ))}
                </div>
                {Array.from({ length: 25 }).map((_, j) => (
                    <div style={{ display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"space-evenly", backgroundColor: "red", width: "3.5%" }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div style={{ backgroundColor: "green", width: "90%", height:"13%", borderRadius:"25%", textAlign:"center" }}>{days[j][6 - i].getDate()}</div>
                    ))}
                    </div>
                ))}
            </div>
        </Card>
    );
}