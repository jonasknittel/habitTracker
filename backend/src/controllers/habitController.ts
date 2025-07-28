import { Response } from 'express';
import { UserRequest } from '../models/userRequest';
import db from '../db/database';

export const getAllHabits = (req: UserRequest, res: Response) => {
    const userId = req.userId;

    db.all('SELECT * FROM habits WHERE userId = ?', [userId], (err, rows) => {
        if (err) {
            console.error('DB error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(rows);
    });
}