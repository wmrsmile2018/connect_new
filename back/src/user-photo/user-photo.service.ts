import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { DbService } from 'src/db/db.service';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class UserPhotoService {
  constructor(
    private readonly db: DbService,
    private readonly awsS3Service: AwsS3Service,
    private readonly photoService: PhotoService,
  ) {}
  async uploadPhotos(args: {
    files: Array<{ id: string; fileName: string; data: Buffer }>;
    userId: number;
    location: string;
    timeZone: string;
  }) {
    const { userId, location, timeZone, files } = args;
    const status = await this.db.status.findFirst({
      where: { code: 'ACTIVE' },
    });
    if (!status) {
      throw new InternalServerErrorException();
    }

    const failureIds = await this.awsS3Service.uploadFiles(files);
    const successfulyUploadedFiles = files.filter(
      (file) => !failureIds.includes(file.id),
    );

    successfulyUploadedFiles.forEach(async (file) => {
      const photo = await this.photoService.createPhoto(file.id);
      await this.db.userPhoto.create({
        data: {
          photoId: photo.id,
          userId: userId,
          statusId: Number(status.id),
          location,
          timeZone,
        },
      });
    });
  }

  async uploadAvatar(args: {
    file: { id: string; data: Buffer };
    userId: number;
    location: string;
    timeZone: string;
  }) {
    const { file, location, timeZone, userId } = args;
    const status = await this.db.status.findFirst({
      where: { code: 'ACTIVE' },
    });
    if (!status) {
      throw new InternalServerErrorException();
    }
    const photo = await this.photoService.createPhoto(file.id);
    await this.db.userPhoto.create({
      data: {
        photoId: photo.id,
        userId: userId,
        statusId: Number(status.id),
        location,
        timeZone,
      },
    });

    return await this.db.user.update({
      where: { id: userId },
      data: { avatarId: file.id },
    });
  }
}
