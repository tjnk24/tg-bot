import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsEmail} from 'class-validator';

import {IsTooLongString} from '__utils/decorators/isTooLongString';

export class CreateUserDto {
    @ApiProperty({
        example: 'userEmail@email.com',
        description: 'Email address',
    })
    @IsString({message: 'Must be a string'})
    @IsTooLongString()
    @IsEmail(undefined, {message: 'Invalid email'})
    readonly email: string;

    @ApiProperty({
        example: '8B3!c733E4De',
        description: 'Password',
    })
    @IsString({message: 'Must be a string'})
    @IsTooLongString()
    readonly password: string;
}
