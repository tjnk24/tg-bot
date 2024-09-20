import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {UserCreationAttrs} from './types';
import {User} from './user.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(attrs: UserCreationAttrs) {
        return await this.userRepository.create(attrs);
    }

    async getOne(id: number) {
        return await this.userRepository.findByPk(id, {
            attributes: {
                exclude: [
                    'passwordHash',
                    'createdAt',
                    'updatedAt',
                ],
            },
        });
    }

    async getAll() {
        return await this.userRepository.findAll({
            include: {all: true},
        });
    }

    async getByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {email},
            include: {all: true},
        });
    }
}
