import express from 'express';
import cookieParser from 'cookie-parser';

import userTracking from './middleware/userTracking';
import habitRoutes from './routes/habitRoutes';

const app = express();
const PORT = 3001;

app.use(cookieParser());
app.use(userTracking);

app.use('/api/habits', habitRoutes);

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});