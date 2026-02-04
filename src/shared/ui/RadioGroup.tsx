import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

import { cn } from '@/shared/utils/classNames';

export interface RadioGroupProps<T = string> {
  items: T[];
  value?: string;
  onChange?: (value: string) => void;
  extractValue?: (item: T) => string;
  renderValue?: (item: T) => ReactNode;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
  invalid?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = <T,>(props: RadioGroupProps<T>) => {
  const {
    items,
    value,
    onChange,
    extractValue = (item: T) => String(item),
    renderValue = (item: T) => String(item),
    className,
    itemClassName,
    disabled,
    invalid,
    orientation = 'vertical',
  } = props;

  // Normalize data to Record: { [key: string]: ReactNode }
  const itemsRecord = useMemo(() => {
    const record: Record<string, ReactNode> = {};
    items.forEach((item) => {
      const key = extractValue(item);
      record[key] = renderValue(item);
    });
    return record;
  }, [items, extractValue, renderValue]);

  // Get keys array for rendering list
  const itemKeys = useMemo(() => Object.keys(itemsRecord), [itemsRecord]);

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      aria-invalid={invalid}
      className={cn(
        'grid gap-3',
        orientation === 'horizontal' && 'grid-flow-col auto-cols-max',
        className,
      )}
    >
      {itemKeys.map((key) => {
        const id = `radio-${key}`;

        return (
          <div key={key} className={cn('flex items-center gap-2', itemClassName)}>
            <RadioGroupPrimitive.Item
              data-slot="radio-group-item"
              id={id}
              value={key}
              className={cn(
                'aspect-square size-4 shrink-0',
                'rounded-full border shadow-xs',
                'border-input',
                'text-primary',
                'transition-[color,box-shadow] outline-none',
                'focus-visible:border-ring',
                'focus-visible:ring-ring/50',
                'focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20',
                'aria-invalid:border-destructive',
                'disabled:cursor-not-allowed',
                'disabled:opacity-50',
              )}
            >
              <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className="relative flex items-center justify-center"
              >
                <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <label htmlFor={id} className="cursor-pointer text-sm font-normal leading-none">
              {itemsRecord[key]}
            </label>
          </div>
        );
      })}
    </RadioGroupPrimitive.Root>
  );
};
