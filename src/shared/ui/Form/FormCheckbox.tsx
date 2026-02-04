import { ComponentProps } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/shared/ui/Checkbox';
import { FormPrimitive } from '@/shared/ui/FormPrimitive';
import { Label } from '@/shared/ui/Label';
import { cn } from '@/shared/utils/classNames';

export type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ComponentProps<typeof Checkbox>, 'name' | 'checked' | 'onCheckedChange'> & {
  name: TName;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
};

export const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormCheckboxProps<TFieldValues, TName>,
) => {
  const {
    name,
    label,
    containerClassName,
    labelClassName,
    wrapperClassName,
    className,
    ...checkboxProps
  } = props;

  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormPrimitive.Item className={cn(containerClassName)}>
          <div className={cn('flex items-center gap-2', wrapperClassName)}>
            <FormPrimitive.Control>
              <Checkbox
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                id={String(name)}
                className={className}
                {...checkboxProps}
              />
            </FormPrimitive.Control>
            <Label
              htmlFor={String(name)}
              className={cn('cursor-pointer font-normal', labelClassName)}
            >
              {label}
            </Label>
          </div>
          <FormPrimitive.Message />
        </FormPrimitive.Item>
      )}
    />
  );
};
