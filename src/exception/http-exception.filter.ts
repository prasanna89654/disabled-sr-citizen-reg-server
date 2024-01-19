import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //getting response object
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message =
      exception.getResponse()['message'] === undefined
        ? exception.getResponse()
        : exception.getResponse()['message'];

    //sending error response
    response.status(status).json({
      status_code: status,
      message: message,
    });
  }
}
