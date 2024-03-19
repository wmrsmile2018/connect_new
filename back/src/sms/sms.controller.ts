import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SmsService } from './sms.service';
import { VerifyCodeBodyDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sms')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('verify-code')
  @ApiOkResponse()
  async verifyCode(@Body() body: VerifyCodeBodyDto) {
    const res = await this.smsService.verifyCode(body);
    if (!res) {
      throw new UnauthorizedException();
    }
  }
}
