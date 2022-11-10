/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// interface IGetUserAuthInfoRequest extends Request {
//   userId: string; // or any other type
// }

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('authToken');
  if (typeof token !== 'string') return res.status(401).json('Acess denied');
  const payload = jwt.verify(
    token,
    process.env.TOKEN_SECRET ?? 'tokenSecret'
  ) as IPayload;
  req.userId = payload._id;
  next();
};
