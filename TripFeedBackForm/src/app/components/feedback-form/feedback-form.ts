import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { COMMENT_MAX } from '../../data/trips';
import { Rating } from '../../models';
import {
  DuplicateSubmissionError,
  FeedbackStore
} from '../../state/feedback.store';

import { notAlreadyRated } from './not-already-rated.validator';
import { StarRating } from './star-rating/star-rating';
import { YesNoToggle } from './yes-no-toggle/yes-no-toggle';

@Component({
  selector: 'app-feedback-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, StarRating, YesNoToggle],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css'
})
export class FeedbackForm {
  protected readonly store = inject(FeedbackStore);
  protected readonly COMMENT_MAX = COMMENT_MAX;

  readonly form = new FormGroup({
    tripId: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        notAlreadyRated((id) => this.store.isRated(id))
      ]
    }),

    rating: new FormControl<Rating | 0>(0, {
      nonNullable: true,
      validators: [Validators.min(1)]
    }),

    onTime: new FormControl(true, {
      nonNullable: true
    }),

    // Soft limit: validator only, so maxLength attr = 201 is visible (red counter) and blocked.
    comment: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(COMMENT_MAX)]
    })
  });

  /** Ticks on every value/status/touched/pristine change, so computeds below stay in sync. */
  private readonly formEvents = toSignal(this.form.events, {
    initialValue: null
  });

  readonly vm = computed(() => {
    this.formEvents();

    const { tripId, rating, comment } = this.form.controls;

    const show = (c: {
      touched: boolean;
      dirty: boolean;
    }) => c.touched || c.dirty;

    const tripError = !show(tripId)
      ? null
      : tripId.hasError('required')
        ? 'Please select a trip.'
        : tripId.hasError('alreadyRated')
          ? 'This trip has already been rated.'
          : null;

    const ratingError =
      show(rating) && rating.hasError('min')
        ? 'Please choose a rating.'
        : null;

    const commentLength = comment.value.length;
    const commentOver = commentLength > COMMENT_MAX;

    const missing: string[] = [];

    if (tripId.invalid) missing.push('trip');
    if (rating.invalid) missing.push('rating');

    return {
      selectedTrip: this.store.trips.find(
        (t) => t.tripId === tripId.value
      ) ?? null,

      tripError,
      ratingError,
      commentLength,
      commentOver,

      missingHint: missing.length
        ? `Select ${missing.join(' and ')} to submit.`
        : null,

      valid: this.form.valid
    };
  });

  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly lastSubmitted = signal<string | null>(null);

  constructor() {
    // If the rated set changes, re-run the trip validator (duplicate guard layer 2).
    effect(() => {
      this.store.ratedTripIds();

      this.form.controls.tripId.updateValueAndValidity();
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.submitting()) return;

    const { tripId, rating, onTime, comment } =
      this.form.getRawValue();

    this.submitting.set(true);
    this.submitError.set(null);
    this.lastSubmitted.set(null);

    try {
      await this.store.submit({
        tripId,
        rating: rating as Rating,
        onTime,
        ...(comment.trim() ? { comment: comment.trim() } : {})
      });

      this.lastSubmitted.set(tripId);

      this.form.reset(); // nonNullable = ('', 0, true, '')
      // star CVA clears hover in writeValue
    } catch (e) {
      this.submitError.set(
        e instanceof DuplicateSubmissionError
          ? `A duplicate submission for ${tripId} is blocked`
          : 'Something went wrong. Please try again.'
      );
    } finally {
      this.submitting.set(false);
    }
  }
}