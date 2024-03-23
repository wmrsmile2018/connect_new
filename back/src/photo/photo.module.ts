import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [PhotoService],
})
export class PhotoModule {}
