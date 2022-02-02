import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionLogService } from '../../exception-log/exception-log.service';

@Catch(HttpException)
export class LogExceptionFilter implements ExceptionFilter {
  constructor(private readonly exceptionService: ExceptionLogService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const error = exception.getResponse();
    let myResponse;
    if (typeof error === 'string') {
      myResponse = { message: error };
    } else {
      myResponse = error as object;
    }
    const log = await this.exceptionService.insert(
      exception.getStatus(),
      myResponse.message,
      response.req.url,
      response.req.method,
    );
    response.status(exception.getStatus()).json({
      ...myResponse,
      ...log,
    });
  }
}
