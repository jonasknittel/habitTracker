import { Response } from 'express';
import { UserRequest } from '../models/userRequest';
import db from '../db/database';

export const getUser = (req: UserRequest, res: Response) => {
    const userId = req.userId;

    db.all('SELECT * FROM users WHERE userID = ?',
        [userId], (err, row) => {
            if (err) {
                console.error('DB error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json(row);
        }
    )
}

export const updateUser = (req:UserRequest, res:Response) => {
    const { name } = req.body;
    const userId = req.userId;

    db.run('UPDATE users SET name = ? WHERE id = ?',
    [name, userId],
    function (err) {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found or not yours' });
      }

      res.json({ success: true, updatedId: userId });
    }
  );
};

export const deleteUser = (req: UserRequest, res: Response) => {
  const userId = req.userId;

  db.run(
    'DELETE FROM isers WHERE id = ?',
    [userId],
    function (err) {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found or not yours' });
      }

      res.json({ success: true, deletedId: userId });
    }
  );
};