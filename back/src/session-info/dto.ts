import { ApiProperty } from '@nestjs/swagger';

export class GetSessionInfoDto {
  @ApiProperty()
  sub: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  timeZone: string;

  @ApiProperty()
  'iat': number;
  @ApiProperty()
  'exp': number;
}
