import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | { statusCode: number; message: string | string[]; error: string };

    response.status(status).json(
      typeof error === "string"
        ? {
            success: false,
            statusCode: status,
            error,
            timpstamp: new Date().toISOString(),
            path: request.url,
          }
        : {
            success: false,
            statusCode: error.statusCode,
            error: error.error,
            message: error.message,
            timpstamp: new Date().toISOString(),
            path: request.url,
          },
    );
  }
}
