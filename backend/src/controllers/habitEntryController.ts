import { Response } from 'express';
import { UserRequest } from '../models/userRequest';
import db from '../db/database';
import path from 'path';


export const getAllHabitEntries = (req: UserRequest, res: Response) => {
    const { habitId } = req.params;

    if (!habitId) {
        return res.status(400).json({ error: 'Missing habitId' });
    }

    db.all('SELECT * FROM habitEntries WHERE habitId = ?', 
        [habitId], 
        (err, rows) => {
            if (err) {
                console.error('DB error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json(rows);
        }
    );
}

export const createHabitEntry = (req: UserRequest, res: Response) => {
    const { habitId } = req.params;
    let { time } = req.body;

    if (!time) {
        time = new Date().toISOString(); // use current time in ISO format
    }

    if (!habitId) {
        return res.status(400).json({ error: 'Missing habitId' });
    }

    

    db.run(
        `INSERT INTO habitEntries (habitId, completedAt)
         VALUES (?, ?)`,
        [habitId, time ],
        function (err) {
            if (err) {
                console.error('DB error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            return res.status(201).json({
                id: this.lastID,
                habitId,
                time,
            });
        }
    );

    console.log(`[${path.basename(__filename)}]`, 'new habit Entry for habit: ', habitId);
}

export const getSingleHabitEntry = (req: UserRequest, res: Response) => {
    const { habitId, habitEntryId } = req.params;

    if (!habitId) {
        return res.status(400).json({ error: 'Missing habitId' });
    }

    db.all('SELECT * FROM habitEntries WHERE habitId = ? AND id = ?', 
        [habitId, habitEntryId], 
        (err, rows) => {
            if (err) {
                console.error('DB error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json(rows);
        }
    );
}

export const updateHabitEntry = (req: UserRequest, res: Response) => {
    const { habitId, entryId } = req.params;
    const { time, comment } = req.body;

    db.run(
        `UPDATE habitEntries
         SET completedAt = ?, comment = ?
         WHERE id = ? AND habitId = ?`,
        [time, comment, entryId, habitId],
        function (err) {
            if (err) {
                console.error('DB error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Habit entry not found' });
            }

            res.json({ message: 'Habit entry updated' });
        }
    );
}

export const deleteHabitEntry = (req: UserRequest, res: Response) => {
    const { habitId, entryId } = req.params;

    db.run(
        `DELETE FROM habitEntries
         WHERE id = ? AND habitId = ?`,
        [entryId, habitId],
        function (err) {
            if (err) {
                console.error('DB error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Habit entry not found' });
            }

            res.status(204).send(); // No content
        }
    );
}