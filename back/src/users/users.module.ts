import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DbModule, ConfigModule],
  providers: [UsersService, DbService],
  controllers: [UsersController],
})
export class UsersModule {}
