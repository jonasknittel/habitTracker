// src/pages/Home.tsx
import CalendarCard from '../components/CalendarCard';
import { Button } from 'primereact/button';
import { getHabits, addHabit } from '../api/habitApi'
import { useEffect, useState } from 'react';
import { Habit } from '../models/Habit';


export default function Home() {
  // Load habits
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await getHabits();
        setHabits(response.data); // assuming habits come in response.data
      } catch (error) {
        console.error('Fehler beim Laden der Habits:', error);
      }}
    fetchHabits();
  }, []);

  const handleAddHabit = () => {
    addHabit();
    setHabits(prevHabits => [...prevHabits, new Habit()]);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', paddingTop: '2rem', alignItems: 'center', gap: '5vw' }}>
        <CalendarCard/>
        {habits.map((habit, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            {habit.name}
          </div>
        ))}
        <Button 
          icon="pi pi-plus"
          className='p-button-rounded p-button-primary circular-button'
          style={{
            width: '6rem',
            height: '6rem',
            padding: 0,
            fontSize: '10vw'
          }}
          pt={{
            icon: {
              style: {
                fontSize: '2.5rem'
              }
            }
          }}
          onClick={handleAddHabit}
        />
    </div>
    )
}
