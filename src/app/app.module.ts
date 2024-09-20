import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {
    APP_GUARD,
    APP_INTERCEPTOR,
    APP_FILTER,
} from '@nestjs/core';
import {SequelizeModule} from '@nestjs/sequelize';
import {AllExceptionsFilter} from 'src/filters/allExceptions.filter';
import {LoggingInterceptor} from 'src/interceptors/logging.interceptor';

import {AuthModule} from '__modules/auth';
import {AuthGuard} from '__modules/auth/auth.guard';
import {RefreshSession} from '__modules/refreshSessions/refreshSessions.model';
import {RefreshSessionsModule} from '__modules/refreshSessions/refreshSessions.module';
import {TestDevModule} from '__modules/testDev/testDev.module';
import {UsersModule} from '__modules/users';
import {User} from '__modules/users/user.model';

import {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
} from '../config';

@Module({
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: POSTGRES_HOST,
            port: Number(POSTGRES_PORT),
            username: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_DB,
            models: [
                User,
                RefreshSession,
            ],
            autoLoadModels: true,
        }),
        AuthModule,
        UsersModule,
        RefreshSessionsModule,
        TestDevModule,
    ],
})
export class AppModule {}
