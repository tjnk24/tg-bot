import {ApiProperty} from '@nestjs/swagger';
import {
    Column,
    DataType,
    Model,
    Table,
    HasMany,
} from 'sequelize-typescript';

import {RefreshSession} from '__modules/refreshSessions/refreshSessions.model';

import {UserCreationAttrs} from './types';

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({
        example: '1',
        description: 'Unique id',
    })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'example@email.com',
        description: 'Unique email',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    passwordHash: string;

    @ApiProperty({
        example: '/api/v1/avatars/some_avatar.png',
        description: 'avatar path',
    })
    @Column({
        type: DataType.STRING,
    })
    avatarLink: string;

    @HasMany(() => RefreshSession)
    refreshSessions: RefreshSession[];
}
