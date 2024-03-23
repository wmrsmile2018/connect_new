import { Module } from '@nestjs/common';
import { UserPhotoService } from './user-photo.service';
import { DbModule } from 'src/db/db.module';
import { UserPhotoController } from './user-photo.controller';
import { UsersModule } from 'src/users/users.module';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { PhotoModule } from 'src/photo/photo.module';
import { PhotoService } from 'src/photo/photo.service';

@Module({
  imports: [DbModule, UsersModule, AwsS3Module, PhotoModule],
  providers: [UserPhotoService, AwsS3Service, PhotoService],
  controllers: [UserPhotoController],
})
export class UserPhotoModule {}
