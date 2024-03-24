import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateProfileByIdBodyDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { DURATION_MAP } from './constants';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {
    // console.log(dayjs('day', undefined).add(1, 'd'));
    console.log('asdasd', new Date().toISOString());
  }

  async findById(id: number) {
    return this.db.user.findFirst({ where: { id: Number(id) } });
  }

  async findByNumber(phone: string) {
    return this.db.user.findFirst({ where: { phone } });
  }

  async getUserMetadataById(userId: number) {
    return this.db.userMetadata.findFirst({ where: { userId } });
  }

  async getUserList(skip: number, take: number) {
    return this.db.user.findMany({
      take,
      skip,
    });
  }

  async updateRefreshToken(userId: number) {
    const refreshToken = uuidv4();
    let userMetadata = await this.db.userMetadata.findFirst({
      where: { userId },
    });
    const status = await this.db.status.findFirst({
      where: { code: 'ACTIVE' },
    });
    if (!status) {
      throw new InternalServerErrorException();
    }

    if (!userMetadata) {
      userMetadata = await this.db.userMetadata.create({
        data: {
          views: 0,
          refreshToken,
          userId,
          statusId: status.id,
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

  async createMarkForUser(args: {
    id: number;
    location: string;
    timeZone: string;
    durationCode: string;
  }) {
    const { durationCode, id, location, timeZone } = args;
    const duration = await this.db.duration.findFirst({
      where: { code: durationCode },
    });
    const durationValue = DURATION_MAP[duration.code];
    if (!duration || !durationValue) {
      throw new InternalServerErrorException();
    }
    let deadline = dayjs(Date.now()).add(...durationValue);
    const markedCard = (
      await this.db.markedCard.findMany({
        where: { userId: id },
      })
    ).at(-1);

    if (markedCard && dayjs(markedCard.deadLine).diff(Date.now()) > 0) {
      deadline = dayjs(markedCard.deadLine).add(...durationValue);
    }

    return this.db.markedCard.create({
      data: {
        userId: id,
        location,
        timeZone,
        deadLine: deadline.toISOString(),
      },
    });
  }

  async isUserMarked(id: number) {
    const markedUserCard = (
      await this.db.markedCard.findMany({
        where: { userId: id },
      })
    ).at(-1);
    if (!markedUserCard) return false;

    return dayjs(markedUserCard.deadLine).diff(Date.now()) > 0;
  }
}
