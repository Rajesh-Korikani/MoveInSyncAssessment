import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

/** Yes/No segmented control bound to a boolean form control. */
@Component({
  selector: 'app-yes-no-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YesNoToggle),
      multi: true
    }
  ],
  templateUrl: './yes-no-toggle.html',
  styleUrl: './yes-no-toggle.css'
})
export class YesNoToggle implements ControlValueAccessor {
  readonly labelledBy = input<string | null>(null);

  readonly value = signal<boolean | null>(null);
  readonly disabled = signal(false);

  private onChange: (v: boolean) => void = () => {};
  onTouched: () => void = () => {};

  set(v: boolean): void {
    this.value.set(v);
    this.onChange(v);
    this.onTouched();
  }

  writeValue(v: boolean | null): void {
    this.value.set(v);
  }

  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}