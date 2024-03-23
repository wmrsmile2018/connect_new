import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionInfo } from './session-info.decorator';
import { GetSessionInfoDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('session-info')
@UseGuards(AuthGuard)
@Controller('session-info')
export class SessionInfoController {
  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
