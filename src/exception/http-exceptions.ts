import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.NOT_FOUND);
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.BAD_REQUEST);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.UNAUTHORIZED);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.FORBIDDEN);
    }
}

export class ConflictException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.CONFLICT);
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class ServiceUnavailableException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.SERVICE_UNAVAILABLE);
    }
}

export class GatewayTimeoutException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.GATEWAY_TIMEOUT);
    }
}

export class BadGatewayException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.BAD_GATEWAY);
    }
}

export class NotImplementedException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.NOT_IMPLEMENTED);
    }
}

export class RequestTimeoutException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.REQUEST_TIMEOUT);
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor(message: string) {
      super(message, HttpStatus.PAYLOAD_TOO_LARGE);
    }
}



