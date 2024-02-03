import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Role } from '@prisma/client';
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

  findByNumber(number: string) {
    return this.db.user.findFirst({ where: { number } });
  }

  async create(number: string, hash: string, salt: string, code: number) {
    const user = await this.db.user.create({
      data: {
        number,
        hash,
        salt,
        createDateTime: Date.now().toString(),
        role: Role.NEW,
        code,
      },
    });
    // await this.accountService.create(user.id);
    // await this.blockListService.create(user.id);
    return user;
  }

  // async createUser(number: string): Promise<number> {
  //   const user = await this.db.user.findFirst({ where: { number } });
  // const code = Math.floor(Math.random() * 90000) + 10000;

  //   if (!user) {
  //     await this.db.user.create({
  //       data: {
  //         number,
  //         code,
  //         createDateTime: Date.now().toString(),
  //         role: Role.NEW,
  //       },
  //     });
  //   }

  //   if (user) {
  //     await this.db.user.update({
  //       where: { id: user.id },
  //       data: { code, createDateTime: Date.now().toString() },
  //     });
  //   }
  //   return code;
  // }

  async updateUser(data: UpdateUserBodyDto) {
    const user = await this.db.user.findFirst({
      where: { number: data.number },
    });

    await this.db.user.update({
      where: { id: user.id },
      data: { role: data.role, number: data.number, code: data.code },
    });
  }
}
