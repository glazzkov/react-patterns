import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { FormPrimitive } from '@/shared/ui/FormPrimitive';
import { RadioGroup, RadioGroupProps } from '@/shared/ui/RadioGroup';
import { cn } from '@/shared/utils/classNames';

export type FormRadioGroupProps<
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<RadioGroupProps<T>, 'value' | 'onChange'> & {
  name: TName;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
};

export const FormRadioGroup = <
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormRadioGroupProps<T, TFieldValues, TName>,
) => {
  const { name, label, containerClassName, labelClassName, ...radioGroupProps } = props;

  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormPrimitive.Item className={cn(containerClassName)}>
            {label && <FormPrimitive.Label className={labelClassName}>{label}</FormPrimitive.Label>}
            <FormPrimitive.Control>
              <RadioGroup
                {...radioGroupProps}
                value={field.value ?? ''}
                onChange={field.onChange}
                invalid={!!fieldState.error}
              />
            </FormPrimitive.Control>
            <FormPrimitive.Message />
          </FormPrimitive.Item>
        );
      }}
    />
  );
};
