import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {Response} from 'express';

import {CreateUserDto} from '__modules/users/dto/create-user.dto';
import {IsUnprotected} from '__utils/metadata/isUnprotected';

import {AuthService} from './auth.service';
import {AuthResponseDto} from './dto/authResponse.dto';
import {LogoutDto} from './dto/logout.dto';
import {
    LoginRequest,
    LoginResponse,
    RefreshTokensRequest,
    SignUpRequest,
    SignUpResponse,
} from './types';

@ApiTags('Auth')
@Controller({
    version: '1',
    path: 'auth',
})
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiOperation({summary: 'Login'})
    @ApiResponse({
        status: HttpStatus.OK,
        type: AuthResponseDto,
    })
    @IsUnprotected()
    async login(
        @Req() request: LoginRequest,
        @Res() response: LoginResponse,
        @Body() _body: CreateUserDto,
    ) {
        return await this.authService.login(request, response);
    }

    @Post('/sign-up')
    @ApiOperation({summary: 'Sign Up'})
    @ApiResponse({
        status: HttpStatus.OK,
        type: AuthResponseDto,
    })
    @IsUnprotected()
    async signUp(
        @Req() request: SignUpRequest,
        @Res() response: SignUpResponse,
        @Body() _body: CreateUserDto,
    ) {
        return await this.authService.signUp(request, response);
    }

    @Post('/logout')
    @ApiOperation({summary: 'Log out'})
    @ApiResponse({status: HttpStatus.OK})
    @IsUnprotected()
    logOut(@Body() body: LogoutDto) {
        return this.authService.logOut(body.token);
    }

    @Post('/refresh-tokens')
    @ApiOperation({summary: 'Refresh tokens'})
    @ApiResponse({status: HttpStatus.OK})
    @IsUnprotected()
    refreshTokens(
        @Req() request: RefreshTokensRequest,
        @Res() response: Response,
    ) {
        return this.authService.refreshTokens(request, response);
    }
}
