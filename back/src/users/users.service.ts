import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateUserBodyDto } from './dto';

// 1) пароль / логин
// 2) смс
// 3) подтверджение

// 1) создать пользователя, сгенерировать код
// 2) отправить смс
// 3) сверить код

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {
    // this.db.user.findMany().then((res) => console.log(res));
  }

  findByNumber(phone: string) {
    return this.db.user.findFirst({ where: { phone } });
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

  async setHashAndSalt(phone: string, hash: string, salt: string) {
    const user = await this.db.user.findFirst({ where: { phone } });

    if (!user) {
      throw new HttpException('incorrect phone number', HttpStatus.BAD_REQUEST);
    }

    return await this.db.user.update({
      where: { phone },
      data: { salt, hash },
    });
  }

  async updateUser(data: UpdateUserBodyDto) {
    const user = await this.db.user.findFirst({
      where: { phone: data.phone },
    });

    // Нужно ли тут проверять с токеном jwt из сессии ?
    if (!user) {
      throw new HttpException('incorrect phone number', HttpStatus.BAD_REQUEST);
    }

    await this.db.user.update({
      where: { id: user.id },
      data,
    });
  }
}
