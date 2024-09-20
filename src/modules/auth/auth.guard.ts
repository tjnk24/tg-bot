import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Request, Response} from 'express';

import {METADATA_KEY} from '__utils/metadata/isUnprotected';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isUnprotected = this.reflector.get<boolean>(METADATA_KEY, context.getHandler());

        if (isUnprotected) {
            return true;
        }

        const argumentsHost = context.switchToHttp();
        const request: Request = argumentsHost.getRequest();
        const response: Response = argumentsHost.getResponse();

        await this.authService.refreshTokens(request, response);

        return true;
    }
}
