import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {JWT_KEY} from 'src/config';

import {RefreshSessionsModule} from '__modules/refreshSessions/refreshSessions.module';
import {UsersModule} from '__modules/users';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({secret: JWT_KEY}),
        RefreshSessionsModule,
    ],
    exports: [
        AuthService,
        JwtModule,
    ],
})
export class AuthModule {}
