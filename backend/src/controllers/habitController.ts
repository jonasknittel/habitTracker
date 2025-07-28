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

export const createHabit = (req:UserRequest, res:Response) => {
    const userId = req.userId;
    const { name, frequency } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Habit name is required' });
    }

    db.run('INSERT INTO habits (userId, name, frequency) VALUES (?, ?, ?)',
        [userId, name, frequency || 'daily'], 
        function (err) {
        if (err) {
            console.error('DB error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ id: this.lastID, userId, name, frequency, streak: 0 });
    });
}

export const updateHabit = (req:UserRequest, res:Response) => {
    const habitId = parseInt(req.params.id, 10);
    const { name, frequency } = req.body;
    const userId = req.userId;

    if (!habitId || !userId) {
        return res.status(400).json({ error: 'Invalid ID or user' });
    }

    db.run(
    `UPDATE habits 
     SET name = ?, frequency = ?
     WHERE id = ? AND userId = ?`,
    [name, frequency, habitId, userId],
    function (err) {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Habit not found or not yours' });
      }

      res.json({ success: true, updatedId: habitId });
    }
  );
};

export const deleteHabit = (req: UserRequest, res: Response) => {
  const habitId = parseInt(req.params.id, 10);
  const userId = req.userId;

  if (!habitId || !userId) {
    return res.status(400).json({ error: 'Invalid ID or user' });
  }

  db.run(
    'DELETE FROM habits WHERE id = ? AND userId = ?',
    [habitId, userId],
    function (err) {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Habit not found or not yours' });
      }

      res.json({ success: true, deletedId: habitId });
    }
  );
};