import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class AuthResponseDto {
    @ApiProperty({description: 'Access token'})
    @IsString({message: 'Must be a string'})
    readonly accessToken: string;
}
