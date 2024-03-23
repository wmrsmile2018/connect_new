import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { SmsModule } from './sms/sms.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { UserPhotoModule } from './user-photo/user-photo.module';
import { SessionInfoModule } from './session-info/session-info.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    SmsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AwsS3Module,
    UserPhotoModule,
    SessionInfoModule,
    PhotoModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
