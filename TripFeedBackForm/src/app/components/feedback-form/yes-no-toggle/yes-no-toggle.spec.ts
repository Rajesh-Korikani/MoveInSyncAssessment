import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YesNoToggle } from './yes-no-toggle';

describe('YesNoToggle', () => {
  let component: YesNoToggle;
  let fixture: ComponentFixture<YesNoToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YesNoToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(YesNoToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
