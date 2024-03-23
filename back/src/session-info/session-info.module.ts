import { Module } from '@nestjs/common';
import { SessionInfoController } from './session-info.controller';

@Module({
  controllers: [SessionInfoController],
})
export class SessionInfoModule {}
