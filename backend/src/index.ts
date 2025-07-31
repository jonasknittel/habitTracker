import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userTracking from './middleware/userTracking';

import habitRoutes from './routes/habitRoutes';
import userRoutes from './routes/userRoutes';
import habitEntryRoutes from './routes/habitEntryRoutes';

const app = express();
const PORT = 3001;

app.use(cookieParser());
app.use(userTracking);
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/api/habits', habitRoutes);
app.use('/api/users', userRoutes);
app.use('/api/habits/:habitId/entries', habitEntryRoutes);

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});