import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let { status } = exception;

    if (!status) {
      if (EntityNotFoundError.name.includes(exception?.name)) {
        status = HttpStatus.NOT_FOUND;
      } else if (
        QueryFailedError.name.includes(exception?.name) &&
        exception?.message.includes("Duplicate")
      ) {
        status = HttpStatus.UNPROCESSABLE_ENTITY;
      } else if (NotFoundException.name.includes(exception?.name)) {
        status = HttpStatus.NOT_FOUND;
      } else if (ServiceUnavailableException.name.includes(exception?.name)) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
      } else if (NotAcceptableException.name.includes(exception?.name)) {
        status = HttpStatus.NOT_ACCEPTABLE;
      } else if (BadRequestException.name.includes(exception?.name)) {
        status = HttpStatus.BAD_REQUEST;
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }

    response.status(status).json({
      ...exception,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
