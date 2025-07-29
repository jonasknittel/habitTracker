// src/pages/Home.tsx
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';


import { Card } from 'primereact/card';
import CalendarCard from '../components/CalendarCard';
        

export default function Home() {
  return <div style={{ width: '90%', margin: '0 auto', paddingTop: '2rem' }}>
            <CalendarCard></CalendarCard>
    </div>;
}
