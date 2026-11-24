import { LOW_RATING_THRESHOLD } from '../data/trips';
import { DriverStats, Submission, Trip } from '../models';

/**
 * Pure aggregation: derives per-driver stats from trips + submissions.
 * Drivers are seeded from trips, so a driver with zero ratings still gets a row.
 */
export function computeDriverStats(
  trips: readonly Trip[],
  submissions: readonly Submission[],
): DriverStats[] {
  const tripToDriver = new Map(trips.map((t) => [t.tripId, t.driverId]));
  const byDriver = new Map<string, DriverStats>();

  for (const t of trips) {
    const d = byDriver.get(t.driverId) ?? {
      driverId: t.driverId,
      driverName: t.driverName,
      tripCount: 0,
      ratingCount: 0,
      average: null,
      isLow: false,
      submissions: [],
    };
    d.tripCount++;
    byDriver.set(t.driverId, d);
  }

  for (const s of submissions) {
    const driverId = tripToDriver.get(s.tripId);
    if (driverId) byDriver.get(driverId)!.submissions.push(s); // ignore orphans
  }

  return [...byDriver.values()].map((d) => {
    const ratingCount = d.submissions.length;
    const average = ratingCount
      ? d.submissions.reduce((sum, s) => sum + s.rating, 0) / ratingCount
      : null;
    return {
      ...d,
      ratingCount,
      average,
      // Compared on the raw average, not the rounded display value.
      isLow: average !== null && average < LOW_RATING_THRESHOLD,
    };
  });
}

export function formatAverage(avg: number | null): string {
  return avg === null ? '-' : avg.toFixed(2);
}