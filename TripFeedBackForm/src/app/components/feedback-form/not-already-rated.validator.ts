import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

/**
 * Invalidates the trip control if feedback already exists for the chosen trip.
 */
export function notAlreadyRated(
  isRated: (tripId: string) => boolean
): ValidatorFn {
  return (
    control: AbstractControl<string>
  ): ValidationErrors | null =>
    control.value && isRated(control.value)
      ? { alreadyRated: true }
      : null;
}