import { Response } from 'express';
import { UserRequest } from '../models/userRequest';
import db from '../db/database';

export const getUser = (req: UserRequest, res: Response) => {
    const userId = req.userId;

    db.all('SELECT * FROM users WHERE id = ?',
        [userId], (err, row) => {
            if (err) {
                console.error('DB error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }
            console.log(row);
            res.json(row);
        }
    )
}

export const updateUser = (req:UserRequest, res:Response) => {
    const { name, email } = req.body;
    const userId = req.userId;

    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
    }

    if (email !== undefined) {
      fields.push('email = ?');
      values.push(email);
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID missing' });
    }


    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    values.push(userId);


    db.run(sql, values, function (err) {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found or not yours' });
      }

      res.json({ success: true, updatedId: userId });
    });
};

export const deleteUser = (req: UserRequest, res: Response) => {
  const userId = req.userId;

  console.log("deleting user: ", {userId})
  db.run(
    'DELETE FROM users WHERE id = ?',
    [userId],
    function (err) {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found or not yours' });
      }

      res.clearCookie('userId');
      res.json({ success: true, deletedId: userId });
    }
  );
};