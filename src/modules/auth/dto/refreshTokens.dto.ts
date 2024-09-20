import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class RefreshTokensDto {
    @ApiProperty({description: 'fingerprint'})
    @IsString({message: 'Must be a string'})
    readonly fingerprint: string;
}
