import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SMSRuModule } from 'node-sms-ru/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsController } from './sms.controller';
import { UsersService } from 'src/users/users.service';
import { DbService } from 'src/db/db.service';

@Module({
  imports: [
    SMSRuModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        api_id: configService.get('SMS_RU_API_ID'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],

  providers: [SmsService, UsersService, DbService],

  controllers: [SmsController],
})
export class SmsModule {}
