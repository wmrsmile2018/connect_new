import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PasswordService } from './password.service';
import { UsersService } from 'src/users/users.service';
import { SmsService } from 'src/sms/sms.service';
import { JwtService } from '@nestjs/jwt';
import { SEND_MESSAGE } from './constants';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DbService,
    private readonly passwordService: PasswordService,
    private readonly smsService: SmsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async checkNumber(phone: string) {
    const user = await this.usersService.findByNumber(phone);
    if (user && user.hash) {
      throw new HttpException(
        `User with ${phone} number already exist`,
        HttpStatus.BAD_REQUEST,
      );
      // throw new BadRequestException(`User with ${phone} number already exist`);
    }

    const code = Math.floor(Math.random() * 90000) + 10000;
    this.smsService.sendSMSNotification(phone, `${SEND_MESSAGE} ${code}`);
    if (!user) {
      return this.usersService.create(phone, code);
    }

    if (!user?.hash) {
      return this.usersService.updateProfileById(user.id, { phone, code });
    }
  }

  async signUp(phone: string, password: string) {
    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);
    return await this.usersService.setUserCredentials(phone, hash, salt);
  }

  async signIn(phone: string, password: string) {
    const user = await this.usersService.findByNumber(phone);

    if (!user) {
      throw new UnauthorizedException();
    }
    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const { refreshToken } = await this.usersService.updateRefreshToken(
      user.id,
    );
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      phone: user.phone,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(oldRefreshToken: string, userId: number) {
    const dateNow = Date.now();
    const userMetadata = await this.usersService.getUserMetadataById(userId);
    const user = await this.usersService.findById(userId);
    const delta = dayjs(Date.now()).diff(userMetadata.tokenCreationDateTime);
    const deadline = dayjs(dateNow).add(1, 'M').diff(dateNow);

    if (!user) {
      throw new BadRequestException(`Ivanlid userId ${userId}`);
    }

    if (delta >= deadline) {
      throw new UnauthorizedException(`The token refresh period has expired`);
    }

    if (oldRefreshToken !== userMetadata.refreshToken) {
      throw new BadRequestException(`Ivanlid refresh token ${oldRefreshToken}`);
    }

    const { refreshToken } = await this.usersService.updateRefreshToken(userId);
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      phone: user.phone,
    });

    return { accessToken, refreshToken };
  }
}
