import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import {HttpStatus} from '@nestjs/common/enums';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import {User} from './user.model';
import {UsersService} from './users.service';

@ApiTags('Users')
@Controller({
    version: '1',
    path: 'users',
})
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
    })
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.usersService.getOne(id);
    }
}
