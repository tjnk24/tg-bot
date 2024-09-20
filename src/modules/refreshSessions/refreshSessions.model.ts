import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from 'sequelize-typescript';

import {User} from '__modules/users/user.model';

import {RefreshSessionCreationAttrs} from './types';

@Table({tableName: 'refresh_sessions'})
export class RefreshSession extends Model<RefreshSession, RefreshSessionCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fingerprint: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    refreshToken: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    expiresIn: number;
}
