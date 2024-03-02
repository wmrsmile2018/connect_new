export class UpdateUserBodyDto {
  phone: string;
  firstName?: string;
  surname?: string;
  patronymic?: string;
  avatar?: number;
  timeZone?: string;
  location?: string;
  // format: YYYY-MM-DD HH:MM:SS
  updateDateTime?: string;
  address?: string;
  jobTitle?: string;
  rating?: number;
  description?: string;
  latitude?: string;
  longtitude?: string;
}
