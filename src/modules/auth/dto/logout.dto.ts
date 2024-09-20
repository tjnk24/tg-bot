import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class LogoutDto {
    @ApiProperty({description: 'JWT token'})
    @IsString({message: 'Must be a string'})
    readonly token: string;
}
