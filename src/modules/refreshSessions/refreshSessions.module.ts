import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {RefreshSession} from './refreshSessions.model';
import {RefreshSessionsService} from './refreshSessions.service';

@Module({
    providers: [RefreshSessionsService],
    imports: [SequelizeModule.forFeature([RefreshSession])],
    exports: [RefreshSessionsService],
})
export class RefreshSessionsModule {}
