import { Module } from '@nestjs/common';
import { AwsS3Controller } from './aws-s3.controller';
import { AwsS3Service } from './aws-s3.service';
import { S3Module } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          region: configService.getOrThrow('AWS_S3_REGION'),
          endpoint: configService.getOrThrow('AWS_ENDPOINT'),
          credentials: {
            accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY'),
            secretAccessKey: configService.getOrThrow('AWS_SECRET_KEY'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    //   ThrottlerModule.forRootAsync({
    //     useFactory: (configService: ConfigService) => ({
    //       throttlers: [
    //         {
    //           ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
    //           limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
    //         },
    //       ],
    //     }),
    //     inject: [ConfigService],
    //   }),
  ],
  controllers: [AwsS3Controller],
  providers: [
    AwsS3Service, // { provide: APP_GUARD, useClass: ThrottlerGuard }
  ],
})
export class AwsS3Module {}
