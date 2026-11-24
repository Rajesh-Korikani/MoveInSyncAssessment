import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-low-rating-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'badge-low', role: 'img', 'aria-label': 'Low rating' },
  template: 'Low',
  styles: `
    :host {
      display: inline-block; margin-left: 6px; padding: 1px 6px; border-radius: 999px;
      background: #d32f2f; color: #fff; font-size: .72rem; font-weight: 700; vertical-align: middle;
    }
  `,
})
export class LowRatingBadge {}