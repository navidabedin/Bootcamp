import { Icon } from './Icon';
import { toPersianDigits } from '../../lib/format';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /** برچسب دسترس‌پذیری، مثلاً نام آیتم */
  label: string;
  min?: number;
}

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  label,
  min = 1,
}: QuantityStepperProps) {
  return (
    <div className="stepper" role="group" aria-label={`تعداد ${label}`}>
      <button
        type="button"
        className="stepper__btn"
        onClick={onDecrement}
        disabled={value <= min && false}
        aria-label={`کاهش تعداد ${label}`}
      >
        <Icon name="minus" size={15} strokeWidth={2.2} />
      </button>
      <span className="stepper__value" aria-live="polite">
        {toPersianDigits(value)}
      </span>
      <button
        type="button"
        className="stepper__btn stepper__btn--plus"
        onClick={onIncrement}
        aria-label={`افزایش تعداد ${label}`}
      >
        <Icon name="plus" size={15} strokeWidth={2.2} />
      </button>
    </div>
  );
}
