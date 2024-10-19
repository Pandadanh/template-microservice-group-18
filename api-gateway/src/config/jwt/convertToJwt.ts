import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDtoResponse } from 'src/app/reponse';

@Injectable()
export class ConvertToJwt {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async convertToJwtString(userId: string, data: AuthDtoResponse): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            dataUser: data
        };
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_EXPIRES_IN'),
            secret: this.configService.get('JWT_SECRET')
        });
        return {
            accessToken: token
        };
    }
}