export interface Trip {
  tripId: string;
  driverId: string;
  driverName: string;
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Submission {
  tripId: string;
  rating: Rating;
  onTime: boolean;
  /** Trimmed; omitted when empty. */
  comment?: string;
  /** Epoch ms - used to order submissions in the expandable row. */
  submittedAt: number;
}

export type SubmissionDraft = Omit<Submission, 'submittedAt'>;

export interface DriverStats {
  driverId: string;
  driverName: string;
  /** Trips assigned to the driver (from seed trips). */
  tripCount: number;
  /** Submissions received for those trips. */
  ratingCount: number;
  /** null when ratingCount === 0 - UI shows "-", never NaN. */
  average: number | null;
  isLow: boolean;
  submissions: Submission[];
}