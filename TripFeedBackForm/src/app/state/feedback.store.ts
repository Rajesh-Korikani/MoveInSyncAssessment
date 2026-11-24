import { Injectable, computed, signal } from '@angular/core';
import { TRIPS } from '../data/trips';
import { Submission, SubmissionDraft } from '../models';
import { delay } from '../shared/delay';
import { computeDriverStats } from './driver-stats';

export class DuplicateSubmissionError extends Error {
  constructor(readonly tripId: string) {
    super(`Duplicate submission for ${tripId}`);
    this.name = 'DuplicateSubmissionError';
  }
}

/**
 * Single source of truth. `submissions` is the only mutable state;
 * everything else is a computed() derived from it.
 */
@Injectable({ providedIn: 'root' })
export class FeedbackStore {
  readonly trips = TRIPS;
  /** Simulated latency in ms (overridable in tests). */
  latencyMs = 400;

  readonly #submissions = signal<Submission[]>([]);

  readonly submissions = this.#submissions.asReadonly();
  readonly ratedTripIds = computed(() => new Set(this.#submissions().map((s) => s.tripId)));
  readonly driverStats = computed(() => computeDriverStats(this.trips, this.#submissions()));
  readonly overallAverage = computed(() => {
    const list = this.#submissions();
    return list.length ? list.reduce((sum, s) => sum + s.rating, 0) / list.length : null;
  });

  isRated(tripId: string): boolean {
    return this.ratedTripIds().has(tripId);
  }

  async submit(draft: SubmissionDraft): Promise<void> {
    await delay(this.latencyMs);
    // Re-check AFTER the await so two in-flight submits can't both succeed.
    if (this.isRated(draft.tripId)) throw new DuplicateSubmissionError(draft.tripId);
    this.#submissions.update((list) => [...list, { ...draft, submittedAt: Date.now() }]);
  }
}