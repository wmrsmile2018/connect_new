import { ManipulateType } from 'dayjs';

export const DURATION_MAP: Record<string, [number, ManipulateType]> = {
  '1d': [1, 'd'],
  '3d': [3, 'd'],
  '7d': [7, 'd'],
  '30d': [30, 'd'],
};
