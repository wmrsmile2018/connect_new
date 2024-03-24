import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MarkUserBodyDto {
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: '1d',
  })
  durationCode: string;
}

export class GetUserListBodyDto {
  @ApiPropertyOptional({
    example: 5,
  })
  take?: number;
  @ApiPropertyOptional({
    example: 0,
  })
  skip?: number;
}

export class UpdateProfileByIdBodyDto {
  @ApiPropertyOptional({
    example: 'Inna',
  })
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Arkhipova',
  })
  surname?: string;

  @ApiPropertyOptional({
    example: 'Vadimovna',
  })
  patronymic?: string;

  @ApiPropertyOptional({
    example: 'UTC+00:00',
  })
  timeZone?: string;

  @ApiPropertyOptional({
    example: 'Great Britain London',
  })
  location?: string;

  @ApiPropertyOptional({
    example: '2024-03-15 17:10:12.593',
    // format: YYYY-MM-DD HH:MM:SS
  })
  updateDateTime?: string;
  address?: string;
  jobTitle?: string;
  rating?: number;
  description?: string;
  latitude?: string;
  longtitude?: string;
  phone?: string;
  code?: number;
}
