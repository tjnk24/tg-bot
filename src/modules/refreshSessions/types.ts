import {WhereOptions} from 'sequelize';

import {RefreshSession} from './refreshSessions.model';

export interface RefreshSessionCreationAttrs {
    userId: number;
    refreshToken: string;
    fingerprint: string;
    expiresIn: number;
}

export type SearchOptions = WhereOptions<RefreshSession>;
