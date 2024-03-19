import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class SendSmsBodyDto {
  @ApiProperty({
    example: '8(977)-388-1686',
  })
  @IsNotEmpty()
  number: string;
}

export class VerifyCodeBodyDto {
  @ApiProperty({
    example: 99999,
  })
  @IsNotEmpty()
  @Min(10000)
  @Max(99999)
  code: number;

  @ApiProperty({
    example: '8(977)-388-1686',
  })
  @IsNotEmpty()
  phone: string;
}
