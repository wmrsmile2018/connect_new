import { Injectable } from '@nestjs/common';
import { SMSRu } from 'node-sms-ru';
import { DbService } from 'src/db/db.service';
import { VerifyCodeBodyDto } from './dto';

@Injectable()
export class SmsService {
  constructor(
    private readonly smsRu: SMSRu,
    private readonly db: DbService,
  ) {}

  async sendSMSNotification(to: string, msg: string): Promise<void> {
    await this.smsRu.sendSms({ to, msg: msg });
  }

  async verifyCode({ code, phone }: VerifyCodeBodyDto): Promise<boolean> {
    const user = await this.db.user.findFirst({ where: { phone } });
    return user.code === code;
  }
}
