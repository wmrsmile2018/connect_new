import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AwsS3Service } from './aws-s3.service';
import { ApiFile } from './aws-s3.file.decorator';
import { ApiFiles } from './aws-s3.files.decorator';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('aws-s3')
@Controller('aws-s3')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  @Post('uplaod-file')
  @ApiFile('file', false)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.awsS3Service.uploadFile(
      uuidv4(),
      file.originalname,
      file.buffer,
    );
  }

  @Post('uplaod-files')
  @ApiFiles('photos', false)
  async uploadPhotos(@UploadedFiles() files: Array<Express.Multer.File>) {
    const mappedFiles = files.map((file) => ({
      id: uuidv4(),
      fileName: file.originalname,
      data: file.buffer,
    }));
    return await this.awsS3Service.uploadPhotos(mappedFiles);
  }
}
