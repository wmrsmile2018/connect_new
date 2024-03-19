import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CheckNumberBodyDto,
  GetSessionInfoDto,
  RefreshTokenBodyDto,
  SignInBodyDto,
  SignUpBodyDto,
} from './dto';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './sessionInfo.decorator';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('check-number')
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.OK)
  async checkNumber(@Body() body: CheckNumberBodyDto) {
    return await this.authService.checkNumber(body.phone);
  }

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(
    @Body() body: SignUpBodyDto,
    // @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signUp(body.phone, body.password);
  }

  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      body.phone,
      body.password,
    );

    this.cookieService.setToken(res, accessToken);
    return { accessToken, refreshToken };
  }

  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }

  @Post('refresh-token')
  @ApiOkResponse()
  async refreshToken(
    @Body() refreshTokenBodyDto: RefreshTokenBodyDto,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      refreshTokenBodyDto.refreshToken,
      refreshTokenBodyDto.userId,
    );
    this.cookieService.setToken(res, accessToken);
    return { accessToken, refreshToken };
  }
}
