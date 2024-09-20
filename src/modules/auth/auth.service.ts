import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs';
import {Request, Response} from 'express';
import orderBy from 'lodash/orderBy';

import {JWT_KEY} from '__config';
import {RefreshSessionsService} from '__modules/refreshSessions/refreshSessions.service';
import {CreateUserDto} from '__modules/users/dto/create-user.dto';
import {User} from '__modules/users/user.model';
import {UsersService} from '__modules/users/users.service';

import {
    LoginRequest,
    LoginResponse,
    SignUpRequest,
    SignUpResponse,
    TokenPayload,
} from './types';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private refreshSessionService: RefreshSessionsService,
    ) {}

    async login(request: LoginRequest, response: LoginResponse) {
        const user = await this.validateUser(request.body);

        await this.validateRefreshSessions(user);

        const {accessToken, refreshToken} = await this.createRefreshSession(user, request?.fingerprint.hash);

        const {exp} = this.decodeToken(refreshToken);

        response.cookie(
            'refreshToken',
            refreshToken,
            {
                maxAge: exp,
                httpOnly: true,
                signed: true,
            },
        );

        response.json({accessToken});

        return response;
    }

    async signUp({body, fingerprint}: SignUpRequest, response: SignUpResponse) {
        const candidate = await this.usersService.getByEmail(body.email);

        if (candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(body.password, salt);

        const user = await this.usersService.createUser({...body, passwordHash});

        const {accessToken, refreshToken} = await this.createRefreshSession(user, fingerprint.hash);

        const {exp} = this.decodeToken(refreshToken);

        response.cookie(
            'refreshToken',
            refreshToken,
            {
                maxAge: exp,
                httpOnly: true,
                signed: true,
            },
        );

        response.json({accessToken});

        return response;
    }

    async logOut(refreshToken: string) {
        await this.refreshSessionService.delete({refreshToken});
    }

    async refreshTokens(request: Request, response: Response) {
        const session = await this.validateFingerprint(request);

        const {accessToken, refreshToken} = await this.validateToken(request, session.id);

        const {exp} = this.decodeToken(refreshToken);

        response.setHeader('accessToken', accessToken);
        response.cookie(
            'refreshToken',
            refreshToken,
            {
                maxAge: exp,
                httpOnly: true,
                signed: true,
            },
        );

        return response;
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getByEmail(userDto.email);

        if (user) {
            const isPasswordEquals = await bcrypt.compare(userDto.password, user.passwordHash);

            if (isPasswordEquals) {
                return user;
            }
        }

        throw new UnauthorizedException('Incorrect email or password');
    }

    private async validateRefreshSessions(user: User) {
        const refreshSessions = await this.refreshSessionService.findAll({userId: user.id});

        if (refreshSessions.length === 5) {
            const sortedSessions = orderBy(refreshSessions, ['expiresIn'], ['asc']);

            sortedSessions.pop();

            const sessionsIds = sortedSessions.map(({id}) => id);

            await this.refreshSessionService.delete({id: sessionsIds});
        }
    }

    private async createRefreshSession(user: User, fingerprint: string) {
        const refreshToken = this.generateRefreshToken(user);
        const accessToken = this.generateAccessToken(user);

        const {exp} = this.decodeToken(refreshToken);

        await this.refreshSessionService.create({
            userId: user.id,
            fingerprint,
            refreshToken,
            expiresIn: exp,
        });

        return {
            refreshToken,
            accessToken,
        };
    }

    private generateAccessToken(user: User) {
        const payload: TokenPayload = {
            userId: user.id,
            email: user.email,
        };

        return this.jwtService.sign(payload, {
            expiresIn: '5m',
        });
    }

    private generateRefreshToken(user: User) {
        const payload: TokenPayload = {
            userId: user.id,
            email: user.email,
        };

        return this.jwtService.sign(payload, {
            expiresIn: '14d',
        });
    }

    private async validateFingerprint(request: Request) {
        const session = await this.refreshSessionService.findOne({
            fingerprint: request?.fingerprint.hash,
        });

        if (!session) {
            throw new UnauthorizedException('Fingerprint error');
        }

        return session;
    }

    private async validateToken(request: Request, sessionId: number) {
        const accessToken = this.extractTokenFromHeader(request);

        // проверяется в том числе и заэкспайренность токена
        await this.jwtService
            .verifyAsync(accessToken, {secret: JWT_KEY})
            .catch(() => {
                throw new UnauthorizedException('Invalid token');
            });

        const {userId} = this.decodeToken(accessToken);

        const user = await this.usersService.getOne(userId);

        const newAccess = this.generateAccessToken(user);
        const newRefresh = this.generateRefreshToken(user);

        await this.refreshSessionService.update(sessionId, {refreshToken: newRefresh});

        return {
            accessToken: newAccess,
            refreshToken: newRefresh,
        };
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }

    decodeToken(token: string) {
        return this.jwtService.decode(token) as TokenPayload;
    }
}
