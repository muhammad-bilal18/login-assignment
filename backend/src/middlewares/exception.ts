import { Request, Response, NextFunction } from 'express';

export function exception(ex: Error, req: Request, res: Response, next: NextFunction): void 
{
  console.log(ex.message);
  res.status(500).send({
    message: 'Internal server error. Please try again later.'
  });
}
