import { Response, NextFunction } from 'express';
import db from '../db/database';
import { UserRequest } from '../models/userRequest';

const userTracking = (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.cookies.userId;

  if (userId) {
    req.userId = parseInt(userId, 10);
    return next();
  }

  // Benutzer existiert noch nicht → anlegen
  db.run('INSERT INTO users (name) VALUES (?)', ['Anonymous'], function (err) {
    if (err) return next(err);

    const newUserId = this.lastID;
    res.cookie('userId', newUserId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 Jahr
    });

    req.userId = newUserId;
    next();
  });
};

export default userTracking;