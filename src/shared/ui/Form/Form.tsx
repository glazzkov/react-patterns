/* eslint-disable react-refresh/only-export-components */

import type { ComponentProps, ReactNode } from 'react';
import { FieldPath, FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

import { cn } from '@/shared/utils/classNames';

import { FormCheckbox } from './FormCheckbox';
import { FormCheckboxGroup, FormCheckboxGroupProps } from './FormCheckboxGroup';
import { FormField } from './FormField';
import {
  FormInput,
  FormMaskedInput,
  FormNumberInput,
  FormPhoneInput,
  FormTextArea,
} from './FormInput';
import { FormRadioGroup, FormRadioGroupProps } from './FormRadioGroup';
import { FormSelect, FormSelectProps } from './FormSelect';

export type FormProps<TFieldValues extends Record<string, unknown>> = Omit<
  ComponentProps<'form'>,
  'children'
> & {
  form: UseFormReturn<TFieldValues>;
  className?: string;
  render: (Fields: TypedFields<TFieldValues, FieldPath<TFieldValues>>) => ReactNode;
};

export type TypedFields<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = ReturnType<typeof typedFieldsFactory<TFieldValues, TName>>;

export const typedFieldsFactory = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>() => ({
  Input: FormInput<TFieldValues, TName>,
  Textarea: FormTextArea<TFieldValues, TName>,
  MaskedInput: FormMaskedInput<TFieldValues, TName>,
  NumberInput: FormNumberInput<TFieldValues, TName>,
  PhoneInput: FormPhoneInput<TFieldValues, TName>,
  Select: FormSelect as unknown as <T>(props: FormSelectProps<T, TFieldValues, TName>) => ReactNode,
  RadioGroup: FormRadioGroup as unknown as <T>(
    props: FormRadioGroupProps<T, TFieldValues, TName>,
  ) => ReactNode,
  CheckboxGroup: FormCheckboxGroup as unknown as <T>(
    props: FormCheckboxGroupProps<T, TFieldValues, TName>,
  ) => ReactNode,

  Checkbox: FormCheckbox<TFieldValues, TName>,
  Field: FormField<TFieldValues, TName>,
});

export const Form = <TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues>,
) => {
  const { form, render, className, onSubmit, ...restProps } = props;

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className={cn('flex flex-col gap-4', className)} {...restProps}>
        {render(typedFieldsFactory<TFieldValues>())}
      </form>
    </FormProvider>
  );
};
