import { ApiPropertyOptional } from '@nestjs/swagger';

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
