import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateProfileByIdBodyDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {
    // this.db.user.findMany().then((res) => console.log(res));
  }

  findById(id: number) {
    return this.db.user.findFirst({ where: { id } });
  }

  findByNumber(phone: string) {
    return this.db.user.findFirst({ where: { phone } });
  }

  getUserMetadataById(userId: number) {
    return this.db.userMetadata.findFirst({ where: { userId } });
  }

  async updateRefreshToken(userId: number) {
    const refreshToken = uuidv4();
    let userMetadata = await this.db.userMetadata.findFirst({
      where: { userId },
    });

    if (!userMetadata) {
      userMetadata = await this.db.userMetadata.create({
        data: {
          views: 0,
          refreshToken,
          userId,
        },
      });
    }

    return this.db.userMetadata.update({
      where: { id: userMetadata.id },
      data: { refreshToken, userId, views: 0 },
    });
  }

  async create(phone: string, code: number) {
    const role = await this.db.role.findFirst({ where: { code: 'USER' } });
    const priority = await this.db.priority.findFirst({
      where: { code: 'MEDIUM' },
    });

    const user = await this.db.user.create({
      data: {
        phone,
        hash: '',
        salt: '',
        roleCode: role?.code,
        code,
        priorityCode: priority?.code,
      },
    });
    return user;
  }

  async setUserCredentials(phone: string, hash: string, salt: string) {
    const user = await this.db.user.findFirst({ where: { phone } });

    if (!user || user.hash) {
      throw new BadRequestException(
        `The user with phone ${phone} already exist`,
      );
    }
    return this.db.user.update({
      where: { phone },
      data: { salt, hash },
    });
  }

  async updateProfileById(id: number, data: UpdateProfileByIdBodyDto) {
    return await this.db.user.update({
      where: { id: id },
      data,
    });
  }
}
