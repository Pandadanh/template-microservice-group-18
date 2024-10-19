import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/public.decorator";
import { AuthRequest } from "../request";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    // @Public()
    // @Post('register')
    // register(
    //     @Body() auth: AuthRequest
    // ) {
    //     return this.authService.register(auth);
    // }
    @Get('me')
    me(
    ) {

        return 'test1';
    }

    @Public()
    @Get('getToken')
    getToken() {
        try {
            return this.authService.getTokenService();
        } catch (error) {
            console.error('Error fetching token:', error);
            throw new HttpException('Failed to fetch token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Public()
    @Post('login')
    login(
        @Body() auth: AuthRequest
    ) {
        return this.authService.login(auth);
    }
}