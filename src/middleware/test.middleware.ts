import { Request, Response, NextFunction } from 'express'

export function testMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('### testMiddleware')
  next()
}
