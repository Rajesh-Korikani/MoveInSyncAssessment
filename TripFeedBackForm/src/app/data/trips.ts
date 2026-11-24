import { Trip } from '../models';

export const TRIPS: readonly Trip[] = [
  { tripId: 'TRIP-2041', driverId: 'DRV-08', driverName: 'Ramesh K' },
  { tripId: 'TRIP-2042', driverId: 'DRV-08', driverName: 'Ramesh K' },
  { tripId: 'TRIP-2043', driverId: 'DRV-12', driverName: 'Suresh P' },
];

export const LOW_RATING_THRESHOLD = 3.5;
export const COMMENT_MAX = 200;