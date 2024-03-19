import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class AwsS3Service {
  constructor(@InjectS3() private readonly s3: S3) {}

  async uploadFile(
    id: string,
    fileName: string,
    file: Buffer,
  ): Promise<boolean> {
    const res = await this.s3.send(
      new PutObjectCommand({
        Bucket: 'connect',
        Key: fileName,
        Body: file,
      }),
    );
    return res.$metadata.httpStatusCode === HttpStatus.OK;
  }

  async uploadPhotos(
    files: Array<{ id: string; fileName: string; data: Buffer }>,
  ) {
    const fileNameFailure = [];
    files.forEach(async (file) => {
      const res: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand({
          Bucket: 'connect',
          Key: file.id,
          Body: file.data,
        }),
      );

      if (res.$metadata.httpStatusCode === HttpStatus.OK) {
        fileNameFailure.push(file.fileName);
      }
    });
    return fileNameFailure;
  }
}
