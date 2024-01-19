import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SendSmsBodyDto, VerifyCodeBodyDto } from './dto';
import { SEND_MESSAGE } from './constants';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send-sms')
  @ApiOkResponse()
  async sendSms(@Body() body: SendSmsBodyDto) {
    this.smsService.sendSMSNotification(body.number, SEND_MESSAGE);
  }

  @Post('verify-code')
  @ApiOkResponse()
  async verifyCode(@Body() body: VerifyCodeBodyDto) {
    const res = await this.smsService.verifyCode(body);
    if (!res) {
      throw new UnauthorizedException();
    }
  }
}
