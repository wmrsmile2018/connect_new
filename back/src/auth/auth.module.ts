import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { CookieService } from './cookie.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsModule } from 'src/sms/sms.module';
import { SmsService } from 'src/sms/sms.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [
    AuthService,
    PasswordService,
    CookieService,
    SmsService,
    UsersService,
  ],
  controllers: [AuthController],
  imports: [
    DbModule,
    ConfigModule,
    SmsModule,
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
