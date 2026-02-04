import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { FormPrimitive } from '@/shared/ui/FormPrimitive';
import { Select, SelectProps } from '@/shared/ui/Select';
import { cn } from '@/shared/utils/classNames';

export type FormSelectProps<
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SelectProps<T>, 'value' | 'onChange'> & {
  name: TName;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
};

export const FormSelect = <
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormSelectProps<T, TFieldValues, TName>,
) => {
  const { name, label, containerClassName, labelClassName, ...selectProps } = props;

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
              <Select
                {...selectProps}
                value={field.value ?? ''}
                onChange={field.onChange}
                invalid={!!fieldState.error}
                className={cn('w-full', selectProps.className)}
                // Workaround to prevent field value reset on first render: https://github.com/Meong-Road/FE/issues/230
                key={field.value}
              />
            </FormPrimitive.Control>
            <FormPrimitive.Message />
          </FormPrimitive.Item>
        );
      }}
    />
  );
};
