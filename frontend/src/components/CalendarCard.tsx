import React from "react";
import { Card } from "primereact/card";

export default function CalendarCard() {
    const wochentage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    const status = [true, false, true, false, true, false, true];

    return (
        <Card>
            <div style={{ display: 'flex', gap: '10px' }}>
            {wochentage.map((tag, index) => (
                <div key={tag} style={{ textAlign: 'center' }}>
                <div>{tag}</div>
                <div style={{ fontSize: '2rem' }}>
                    {status[index] ? '✔️' : '❌'}
                </div>
                </div>
            ))}
            </div>
        </Card>
    );
}