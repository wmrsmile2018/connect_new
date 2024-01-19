import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { ProfileService } from './profile.service';

@Module({
  imports: [DbModule],
  providers: [UsersService, DbService, ProfileService],
})
export class UsersModule {}
