import { Profile, Role } from '@prisma/client';

export class UpdateUserBodyDto {
  number: string;
  profile?: Profile;
  role?: Role;
  code?: number;
}
