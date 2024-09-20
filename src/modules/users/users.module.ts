import {Module} from '@nestjs/common';
import {forwardRef} from '@nestjs/common/utils';
import {SequelizeModule} from '@nestjs/sequelize';

import {AuthModule} from '__modules/auth';
import {RefreshSession} from '__modules/refreshSessions/refreshSessions.model';

import {User} from './user.model';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, RefreshSession]),
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
