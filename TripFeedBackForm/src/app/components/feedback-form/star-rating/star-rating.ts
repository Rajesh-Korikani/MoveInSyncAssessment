import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Custom 5-star rating - WAI-ARIA radio-group pattern.
 * - Mouse: hover previews, click commits, leaving the group clears the preview.
 * - Keyboard: roving tabindex (one Tab stop); Enter/Space select (native <button>);
 *   Arrow keys / Home / End change value and move focus.
 */
@Component({
  selector: 'app-star-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StarRating), multi: true },
  ],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating implements ControlValueAccessor {
  readonly labelledBy = input<string | null>(null);
  readonly describedBy = input<string | null>(null);

  readonly stars = [1, 2, 3, 4, 5] as const;
  readonly value = signal(0);
  readonly hover = signal(0);
  readonly disabled = signal(false);
  readonly display = computed(() => this.hover() || this.value());

  private readonly starEls = viewChildren<ElementRef<HTMLButtonElement>>('starBtn');

  private onChange: (v: number) => void = () => {};
  onTouched: () => void = () => {};

  select(s: number): void {
    if (this.disabled()) return;
    this.value.set(s);
    this.onChange(s);
    this.onTouched();
  }

  onKeydown(e: KeyboardEvent): void {
    if (this.disabled()) return;
    const current = this.value() || 0;
    let next: number | null = null;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(5, current + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(1, current - 1);
        break;
      case 'Home':
        next = 1;
        break;
      case 'End':
        next = 5;
        break;
    }
    if (next === null) return; // Enter/Space handled natively by <button> click
    e.preventDefault();
    this.select(next);
    this.starEls()[next - 1]?.nativeElement.focus();
  }

  // --- ControlValueAccessor ---
  writeValue(v: number | null): void {
    this.value.set(v ?? 0);
    this.hover.set(0); // Form.reset() -> no stale hover highlight
  }

  registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}