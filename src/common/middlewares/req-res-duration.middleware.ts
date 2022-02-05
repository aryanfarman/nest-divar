import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LOG } from '../../logger/constants/token.constants';

@Injectable()
export class ReqResDurationMiddleware implements NestMiddleware {
  constructor(@Inject(LOG + 'AppLog') private readonly log) {}

  use(req: Request, res: Response, next: () => void) {
    const t0 = performance.now();

    res.on('finish', () => {
      const responseTime = Math.floor(performance.now() - t0) + `ms`;
      this.log(
        `Request with ${req.method} Method
        on ${req.headers.host + req.path}
        spend ${responseTime} for Response`,
      );
    });

    next();
  }
}
