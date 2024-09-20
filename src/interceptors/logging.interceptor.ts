import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {AuthService} from '__modules/auth/auth.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private authService: AuthService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const argumentsHost = context.switchToHttp();
        const {url, method, body, headers, hostname}: Request = argumentsHost.getRequest();
        const response: Response = argumentsHost.getResponse();

        const timestamp = Date.now();

        const refreshToken = headers?.authorization && headers.authorization.split('Bearer ')[1];

        const tokenData = refreshToken && this.authService.decodeToken(refreshToken);

        console.log('============================ request');
        console.log('userId', tokenData?.userId);
        console.log('url', url);
        console.log('method', method);
        console.log('body', body);
        console.log('headers', headers);
        console.log('hostname', hostname);
        console.log('timestamp', timestamp);
        console.log('controller name', context.getClass().name);
        console.log('handler name', context.getHandler().name);
        console.log('============================');

        // добаить мета-дескриптор для отключения логгера, чтобы можно было навесить кастомный логгер на эндпоинт
        // добавить глобальную генерацию ID-токена для гостей
        // добавить роли: гость, клиент

        return next
            .handle()
            .pipe(
                tap(() => {
                    console.log('test pipe');
                    console.log('================================ response');
                    console.log('statusCode', response.statusCode);
                    console.log('statusMessage', response.statusMessage);
                    console.log('headersSent', response.headersSent);
                    // console.log('response', response.json());
                    console.log('duration, ms', Date.now() - timestamp);
                    console.log('================================');
                }),
            );
    }
}
