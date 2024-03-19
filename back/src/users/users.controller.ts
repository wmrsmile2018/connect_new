import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProfileByIdBodyDto } from './dto';
import { UsersService } from 'src/users/users.service';

@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update-profile/:id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Update profile data with user id' })
  @ApiParam({ name: 'id', required: true, description: 'user identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: 'hello' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async updateProfileById(
    @Param('id') id: number,
    @Body() body: UpdateProfileByIdBodyDto,
  ) {
    return await this.usersService.updateProfileById(Number(id), body);
  }
}
