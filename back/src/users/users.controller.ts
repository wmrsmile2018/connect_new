import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  GetUserListBodyDto,
  MarkUserBodyDto,
  UpdateProfileByIdBodyDto,
} from './dto';
import { UsersService } from 'src/users/users.service';
import { SessionInfo } from 'src/session-info/session-info.decorator';
import { GetSessionInfoDto } from 'src/session-info/dto';

@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update-profile/:id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Update profile data with user id' })
  @ApiParam({ name: 'id', required: true, description: 'user identifier' })
  async updateProfileById(
    @Param('id') id: number,
    @Body() body: UpdateProfileByIdBodyDto,
  ) {
    return await this.usersService.updateProfileById(Number(id), body);
  }

  @Get('id/:id')
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true, description: 'user identifier' })
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Get('phone/:phone')
  @ApiOkResponse()
  @ApiParam({ name: 'phone', required: true, description: 'user phone' })
  async getUserByPhone(@Param('phone') phone: string) {
    const user = await this.usersService.findByNumber(phone);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('list')
  @ApiOkResponse()
  async getUsers(@Body() pagination: GetUserListBodyDto) {
    return await this.usersService.getUserList(
      pagination.skip,
      pagination.take,
    );
  }

  @Post('mark-user')
  @ApiOkResponse()
  async markUser(
    @Body() body: MarkUserBodyDto,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    return await this.usersService.createMarkForUser({
      ...session,
      ...body,
    });
  }

  @Get('/:id/is-marked')
  @ApiOkResponse()
  async isUserByIdMarked(@Param('id') id: number) {
    return await this.usersService.isUserMarked(Number(id));
  }
}
