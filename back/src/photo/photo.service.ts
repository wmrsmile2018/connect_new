import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PhotoService {
  constructor(private readonly db: DbService) {}

  async createPhoto(externalId: string) {
    return this.db.photo.create({ data: { externalId: externalId } });
  }
}
