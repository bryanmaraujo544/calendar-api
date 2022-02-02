import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const auth = (req: any, res: Response, next: any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'there is no token', auth: false, user: null });
  }

  const token = authorization.split(' ')[1];

  try {
    const tokenDecoded = jwt.verify(token, 'Ffjk#5kk45921kjfkdjf@*#@(*!');

    if (tokenDecoded) {
      req.token = tokenDecoded;
      req.auth = true;
      next();
    } else {
      return res.json({ message: 'invalid-token', auth: false, user: null });
    }
  } catch {
    return res.json({ message: 'invalid-token', auth: false, user: null });

  }
}
