import { ComponentProps } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { FormPrimitive } from '@/shared/ui/FormPrimitive';
import {
  Input,
  MaskedInput,
  MaskedInputProps,
  NumberInput,
  NumberInputProps,
  PhoneInput,
  PhoneInputProps,
} from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { cn } from '@/shared/utils/classNames';

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ComponentProps<typeof Input>, 'name'> & {
  name: TName;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
};

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormInputProps<TFieldValues, TName>,
) => {
  const { name, label, containerClassName, labelClassName, className, ...inputProps } = props;

  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormPrimitive.Item className={cn(containerClassName)}>
          {label && <FormPrimitive.Label className={labelClassName}>{label}</FormPrimitive.Label>}
          <FormPrimitive.Control>
            <Input {...field} value={field.value ?? ''} className={className} {...inputProps} />
          </FormPrimitive.Control>
          <FormPrimitive.Message />
        </FormPrimitive.Item>
      )}
    />
  );
};

export const FormMaskedInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  containerClassName,
  labelClassName,
  className,
  ...inputProps
}: Omit<MaskedInputProps, 'name'> & FormInputProps<TFieldValues, TName>) => {
  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormPrimitive.Item className={containerClassName}>
          {label && <FormPrimitive.Label className={labelClassName}>{label}</FormPrimitive.Label>}
          <FormPrimitive.Control>
            <MaskedInput
              {...field}
              value={field.value ?? ''}
              className={className}
              {...inputProps}
            />
          </FormPrimitive.Control>
          <FormPrimitive.Message />
        </FormPrimitive.Item>
      )}
    />
  );
};

export const FormNumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  containerClassName,
  labelClassName,
  className,
  ...inputProps
}: Omit<NumberInputProps, 'name'> & FormInputProps<TFieldValues, TName>) => {
  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormPrimitive.Item className={containerClassName}>
          {label && <FormPrimitive.Label className={labelClassName}>{label}</FormPrimitive.Label>}
          <FormPrimitive.Control>
            <NumberInput
              value={field.value}
              onValueChange={field.onChange}
              name={field.name}
              disabled={field.disabled}
              onBlur={field.onBlur}
              className={className}
              {...inputProps}
            />
          </FormPrimitive.Control>
          <FormPrimitive.Message />
        </FormPrimitive.Item>
      )}
    />
  );
};

export const FormPhoneInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  containerClassName,
  labelClassName,
  className,
  ...inputProps
}: Omit<PhoneInputProps, 'name'> & FormInputProps<TFieldValues, TName>) => {
  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormPrimitive.Item className={containerClassName}>
          {label && <FormPrimitive.Label className={labelClassName}>{label}</FormPrimitive.Label>}
          <FormPrimitive.Control>
            <PhoneInput
              {...field}
              {...inputProps}
              value={field.value ?? ''}
              className={className}
            />
          </FormPrimitive.Control>
          <FormPrimitive.Message />
        </FormPrimitive.Item>
      )}
    />
  );
};

export const FormTextArea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  containerClassName,
  labelClassName,
  className,
  ...inputProps
}: Omit<ComponentProps<typeof Textarea>, 'name'> & FormInputProps<TFieldValues, TName>) => {
  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormPrimitive.Item className={containerClassName}>
          {label && <FormPrimitive.Label className={labelClassName}>{label}</FormPrimitive.Label>}
          <FormPrimitive.Control>
            <Textarea {...field} value={field.value ?? ''} className={className} {...inputProps} />
          </FormPrimitive.Control>
          <FormPrimitive.Message />
        </FormPrimitive.Item>
      )}
    />
  );
};
