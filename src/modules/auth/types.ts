import {Request, Response} from 'express';

import {CreateUserDto} from '__modules/users/dto/create-user.dto';

import {AuthResponseDto} from './dto/authResponse.dto';
import {RefreshTokensDto} from './dto/refreshTokens.dto';

export interface TokenPayload {
    userId: number;
    email: string;
    iat?: number;
    exp?: number;
}

export type LoginRequest = Request<null, AuthResponseDto, CreateUserDto>;
export type LoginResponse = Response<AuthResponseDto>;

export type SignUpRequest = Request<null, AuthResponseDto, CreateUserDto>;
export type SignUpResponse = Response<AuthResponseDto>;

export type RefreshTokensRequest = Request<null, null, RefreshTokensDto>;
