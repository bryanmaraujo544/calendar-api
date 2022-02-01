import { Request, Response } from 'express';

const errorHandler = (error: any, req: Request, res: Response, next: any) => {
  console.log('Error Handler', error);
  res.sendStatus(500);
}

export default errorHandler;
