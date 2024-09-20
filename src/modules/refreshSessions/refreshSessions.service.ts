import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {RefreshSession} from './refreshSessions.model';
import {RefreshSessionCreationAttrs, SearchOptions} from './types';

@Injectable()
export class RefreshSessionsService {
    constructor(
        @InjectModel(RefreshSession) private refreshSessionRepository: typeof RefreshSession,
    ) {}

    async create(attrs: RefreshSessionCreationAttrs) {
        return await this.refreshSessionRepository.create(attrs);
    }

    async delete(options: SearchOptions) {
        return await this.refreshSessionRepository.destroy({
            where: options,
        });
    }

    async findOne(options: SearchOptions) {
        return await this.refreshSessionRepository.findOne({
            where: options,
        });
    }

    async findAll(options: SearchOptions) {
        return await this.refreshSessionRepository.findAll({
            where: options,
            include: {all: true},
        });
    }

    async update(sessionId: number, payload: Partial<RefreshSession>) {
        return await this.refreshSessionRepository.update(
            payload,
            {where: {id: sessionId}},
        );
    }
}
