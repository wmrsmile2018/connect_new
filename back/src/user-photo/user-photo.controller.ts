import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile, ApiFiles } from './user-photo.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { UserPhotoService } from './user-photo.service';
import { SessionInfo } from 'src/session-info/session-info.decorator';
import { GetSessionInfoDto } from 'src/session-info/dto';

@UseGuards(AuthGuard)
@ApiTags('userPhoto')
@Controller('user-photo')
export class UserPhotoController {
  constructor(private readonly userPhotoService: UserPhotoService) {}
  @Post('upload-photos')
  @ApiFiles('photos')
  async uploadPhotos(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    const mappedFiles = files.map((file) => ({
      id: uuidv4(),
      fileName: file.originalname,
      data: file.buffer,
    }));
    return await this.userPhotoService.uploadPhotos({
      ...session,
      files: mappedFiles,
      userId: session.sub,
    });
  }

  @Post('upload-avatar')
  @ApiFile('photos')
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    return await this.userPhotoService.uploadAvatar({
      ...session,
      file: {
        id: uuidv4(),
        data: file.buffer,
      },
      userId: session.sub,
    });
  }
}
