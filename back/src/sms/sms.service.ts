import { Injectable } from '@nestjs/common';
import { SMSRu } from 'node-sms-ru';
import { UsersService } from '../users/users.service';
import { DbService } from 'src/db/db.service';
import { VerifyCodeBodyDto } from './dto';
import { Role } from '@prisma/client';

@Injectable()
export class SmsService {
  constructor(
    private readonly smsRu: SMSRu,
    private readonly usersService: UsersService,
    private readonly db: DbService,
  ) {}

  async sendSMSNotification(to: string, msg: string): Promise<void> {
    const code = await this.usersService.createUser(to);
    await this.smsRu.sendSms({ to, msg: `${msg} ${code}` });
  }

  async verifyCode({ code, number }: VerifyCodeBodyDto): Promise<boolean> {
    const user = await this.db.user.findFirst({ where: { number } });

    if (user.code === code) {
      this.usersService.updateUser({ number, role: Role.USER, code: 0 });
    }
    return user.code === code;
  }
}
