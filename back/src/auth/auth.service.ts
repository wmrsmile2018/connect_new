import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PasswordService } from './password.service';
import { UsersService } from 'src/users/users.service';
import { SmsService } from 'src/sms/sms.service';
import { SEND_MESSAGE } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DbService,
    private readonly passwordService: PasswordService,
    private readonly smsService: SmsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(phone: string, password: string) {
    const user = await this.db.user.findFirst({ where: { phone } });
    const code = Math.floor(Math.random() * 90000) + 10000;
    if (user) {
      throw new BadRequestException({ type: 'phone-exists' });
    }

    this.smsService.sendSMSNotification(phone, `${SEND_MESSAGE} ${code}`);
    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.usersService.create(phone, hash, salt, code);

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
