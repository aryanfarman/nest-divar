import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const t0 = performance.now();
    return next.handle().pipe(
      map((res) => ({
        data: instanceToPlain(res),
        responseTime: Math.floor(performance.now() - t0) + `ms`,
      })),
    );
  }
}
