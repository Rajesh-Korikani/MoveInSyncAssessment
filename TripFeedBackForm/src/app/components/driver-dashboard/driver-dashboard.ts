import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LOW_RATING_THRESHOLD } from '../../data/trips';
import { AveragePipe } from '../../shared/average.pipe';
import { FeedbackStore } from '../../state/feedback.store';
import { LowRatingBadge } from './low-rating-badge';

type Filter = 'all' | 'low';

@Component({
  selector: 'app-driver-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AveragePipe, DatePipe, LowRatingBadge],
  templateUrl: './driver-dashboard.html',
  styleUrl: './driver-dashboard.css',
})
export class DriverDashboard {
  protected readonly store = inject(FeedbackStore);
  protected readonly threshold = LOW_RATING_THRESHOLD;

  readonly filter = signal<Filter>('all');
  readonly expanded = signal<ReadonlySet<string>>(new Set());

  /** Derived - never stored. */
  readonly rows = computed(() => {
    const stats = this.store.driverStats();
    return this.filter() === 'low' ? stats.filter((d) => d.isLow) : stats;
  });

  protected readonly COMMENT_PREVIEW = COMMENT_PREVIEW;
  /** tripIds whose full comment is shown (UI-only state). */
  readonly expandedComments = signal<ReadonlySet<string>>(new Set());

  toggleComment(tripId: string): void {
    this.expandedComments.update((s) => toggled(s, tripId));
  }

  toggle(driverId: string): void {
    this.expanded.update((s) => toggled(s, driverId));
  }
}

const COMMENT_PREVIEW = 50;

function toggled(set: ReadonlySet<string>, key: string): ReadonlySet<string> {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}