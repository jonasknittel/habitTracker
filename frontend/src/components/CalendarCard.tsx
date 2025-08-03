import { Card } from "primereact/card";

import styles from "./CalendarCard.module.css";

export default function CalendarCard() {

    const status = true;
    const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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
        <Card style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ border: "1px", display: "flex", justifyContent: "space-evenly", height: "20vw", width: "85vw", gap: "8px" }}>
                <div 
                    style={{ 
                        display: "flex", 
                        flexDirection:"column",
                        gap: "8px",
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
                        (days[j][6 - i] < today) ? (
                            <div key={i} 
                                style={{ 
                                    backgroundColor: (Math.random() < 0.7) ? "#FADF63" : "#D3D3D3", // random color generator
                                    width: "100%", 
                                    height:"13%", 
                                    borderRadius:"25%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign:"center",
                                    fontWeight: "bold",
                                    fontSize: "1.2vw"
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