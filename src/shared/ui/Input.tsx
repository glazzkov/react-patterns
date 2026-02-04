import type { InputMaskProps } from '@react-input/mask';
import { InputMask } from '@react-input/mask';
import type { ComponentProps, FC } from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';

import { cn } from '@/shared/utils/classNames';

export type MaskedInputProps = InputMaskProps;

export type PhoneInputProps = Omit<InputMaskProps, 'mask' | 'replacement' | 'separate'>;

export type NumberInputProps = Omit<
  NumericFormatProps,
  'value' | 'min' | 'max' | 'onValueChange'
> & {
  value?: number;
  decimalScale?: number;
  min?: number;
  max?: number;
  onValueChange?: (value?: number) => void;
};

const baseClassName = cn(
  'flex h-9 w-full min-w-0',
  'border-input rounded-md border',
  'bg-transparent',
  'px-3 py-1',
  'text-base md:text-sm',
  'shadow-xs outline-none',
  'transition-[color,box-shadow]',
  'placeholder:text-muted-foreground',
  'selection:bg-primary selection:text-primary-foreground',
  'file:inline-flex file:h-7',
  'file:border-0 file:bg-transparent',
  'file:text-foreground file:text-sm file:font-medium',
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
);

export const Input: FC<ComponentProps<'input'>> = (props) => {
  const { className, type, ...restProps } = props;

  return (
    <input type={type} data-slot="input" className={cn(baseClassName, className)} {...restProps} />
  );
};

export const MaskedInput: FC<MaskedInputProps> = (props) => {
  const { className, ...restProps } = props;

  return <InputMask {...restProps} data-slot="input" className={cn(baseClassName, className)} />;
};

export const PhoneInput: FC<PhoneInputProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <InputMask
      {...restProps}
      inputMode="tel"
      autoComplete="tel"
      data-slot="input"
      className={cn(baseClassName, className)}
      mask="+7 (___) ___-__-__"
      replacement={{
        _: /\d/,
      }}
      track={({ data }) => {
        if (!data) return data;
        if (data.length < 2) return data;

        // Correct paste (ctrl + v) and autocomplete handling
        const cleaned = data?.replace(/[^\d]/g, '').replace(/^[78]/, '');

        return cleaned;
      }}
    />
  );
};

export const NumberInput: FC<NumberInputProps> = (props) => {
  const {
    className,
    onValueChange,
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    value,
    ...restProps
  } = props;

  return (
    <NumericFormat
      {...restProps}
      value={value ?? ''}
      min={min}
      max={max}
      decimalSeparator="."
      thousandSeparator=" "
      data-slot="input"
      className={cn(baseClassName, className)}
      allowNegative={(min ?? -1) < 0}
      onValueChange={(e) => onValueChange?.(e.floatValue)}
      isAllowed={(e) =>
        (!!e.floatValue &&
          e.floatValue >= Number.MIN_SAFE_INTEGER &&
          e.floatValue <= Number.MAX_SAFE_INTEGER) ||
        !e.floatValue
      }
    />
  );
};
