import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckNumberBodyDto {
  @ApiProperty({
    example: '8(977)-388-16-86',
  })
  @IsNotEmpty()
  phone: string;
}

export class SignUpBodyDto {
  // @ApiProperty({
  //   example: 'test@gmail.com',
  // })
  // @IsEmail()
  // email: string;

  @ApiProperty({
    example: '8(977)-388-16-86',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '1234',
  })
  @IsNotEmpty()
  password: string;
}

export class SignInBodyDto {
  // @ApiProperty({
  //   example: 'test@gmail.com',
  // })
  // @IsEmail()
  // email: string;
  @ApiProperty({
    example: '8(977)-388-16-86',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '1234',
  })
  @IsNotEmpty()
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  'iat': number;
  @ApiProperty()
  'exp': number;
}
