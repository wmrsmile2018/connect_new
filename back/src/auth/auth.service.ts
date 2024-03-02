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
    const user = await this.db.user.findFirst({ where: { phone } });
    if (user && user.hash) {
      throw new HttpException(
        `User with ${phone} number already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const code = Math.floor(Math.random() * 90000) + 10000;
    this.smsService.sendSMSNotification(phone, `${SEND_MESSAGE} ${code}`);
    this.usersService.create(phone, code);
  }

  async signUp(phone: string, password: string) {
    const user = await this.db.user.findFirst({ where: { phone } });
    if (user) {
      throw new BadRequestException({ type: 'phone-exists' });
    }
    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.usersService.setHashAndSalt(phone, hash, salt);

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      phone: newUser.phone,
    });
    console.log('accessToken', accessToken);

    return { accessToken };
  }

  async signIn(number: string, password: string) {
    const user = await this.usersService.findByNumber(number);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      phone: user.phone,
    });

    return { accessToken };
  }
}
