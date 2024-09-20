import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import {Request, Response} from 'express';

import {AuthService} from '__modules/auth/auth.service';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private authService: AuthService) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const timestamp = Date.now();

        const refreshToken = request?.headers?.authorization && request?.headers.authorization.split('Bearer ')[1];

        const tokenData = refreshToken && this.authService.decodeToken(refreshToken);

        console.log('============================ request');
        console.log('userId', tokenData?.userId);
        console.log('url', request?.url);
        console.log('method', request?.method);
        console.log('body', request?.body);
        console.log('headers', request?.headers);
        console.log('hostname', request?.hostname);
        console.log('timestamp', timestamp);
        console.log('============================');

        console.log('====================== error', {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });

        response.status(status).json({
            statusCode: status,
            message: exception.message,
        });

        console.log('================================ response');
        console.log('statusCode', response.statusCode);
        console.log('statusMessage', response.statusMessage);
        console.log('headersSent', response.headersSent);
        // console.log('response', response.json());
        console.log('duration, ms', Date.now() - timestamp);
        console.log('================================');
    }
}
