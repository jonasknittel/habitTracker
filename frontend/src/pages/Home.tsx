// src/pages/Home.tsx
import CalendarCard from '../components/CalendarCard';
import { Button } from 'primereact/button';
import { getHabits, addHabit, saveHabit } from '../api/habitApi'
import { useEffect, useState } from 'react';
import { Habit } from '../models/Habit';


export default function Home() {
  // Load habits
  const [habits, setHabits] = useState<Habit[]>([]);
  const [editing, setEditing] = useState<number[]>([])

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await getHabits();
        setHabits(response);
      } catch (error) {
        console.error('Fehler beim Laden der Habits:', error);
      }}
    fetchHabits();
  }, []);

  const handleAddHabit = async () => {
    const createdHabit = await addHabit(); // muss Promise<Habit> zurückgeben
    setHabits(prev => [...prev, new Habit(createdHabit.id, createdHabit.name, createdHabit.frequency)]);
  }

  const enableEditing = (id: number) => {
    setEditing((prev) => [...prev, id]);
  }

  const saveEdit = (habit: Habit) => {

    setEditing((prev) => prev.filter((item) => item !== habit.id));

  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', paddingTop: '2rem', paddingBottom: '2rem', alignItems: 'center', gap: '5vw' }}>
        <>EDITING: {editing}</>
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
            {<CalendarCard 
                    isEditing={editing.includes(habits[i].id)}
                    saveEdit={saveEdit}
                    enableEditing={enableEditing} 
                    key={habits[i].id} 
                    habit={habits[i]} />}
          </div>
        ))}
        <Button 
          icon="pi pi-plus"
          className='p-button-rounded p-button-primary circular-button'
          style={{
            width: '6rem',
            height: '6rem',
            padding: '0px, 0px, 100px',
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
