import { ReactNode, useMemo } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/shared/ui/Checkbox';
import { FormPrimitive } from '@/shared/ui/FormPrimitive';
import { Label } from '@/shared/ui/Label';
import { cn } from '@/shared/utils/classNames';

export type FormCheckboxGroupProps<
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  options: T[];
  renderOptionLabel?: (option: T) => ReactNode;
  extractOptionValue?: (option: T) => string | number;
  containerClassName?: string;
  labelClassName?: string;
};

export const FormCheckboxGroup = <
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormCheckboxGroupProps<T, TFieldValues, TName>,
) => {
  const {
    name,
    label,
    options,
    renderOptionLabel = String,
    extractOptionValue = String,
    containerClassName,
    labelClassName,
  } = props;
  const form = useFormContext<TFieldValues>();

  const optionsRecord = useMemo(() => {
    const record = new Map<string | number, ReactNode>();
    options.forEach((option) => {
      record.set(extractOptionValue(option), renderOptionLabel(option));
    });
    return record;
  }, [options, extractOptionValue, renderOptionLabel]);

  const optionKeys = useMemo(() => Array.from(optionsRecord.keys()), [optionsRecord]);

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field }) => {
        const valueKeys = (field.value ?? []) as (string | number)[];

        const valueSet = new Set(valueKeys);

        const handleChange = (optionKey: string | number, checked: boolean) => {
          if (checked) {
            field.onChange([...valueKeys, optionKey]);
          } else {
            field.onChange(valueKeys.filter((key) => key !== optionKey));
          }
        };

        return (
          <fieldset>
            <FormPrimitive.Item className={cn(containerClassName)}>
              {label && <legend className={labelClassName}>{label}</legend>}
              <FormPrimitive.Control>
                <div className="flex flex-col gap-2">
                  {optionKeys.map((key) => {
                    const optionLabel = optionsRecord.get(key);
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <Label className="flex cursor-pointer items-center gap-2 font-normal">
                          <Checkbox
                            checked={valueSet.has(key)}
                            onCheckedChange={(checked) => handleChange(key, !!checked)}
                          />
                          <span>{optionLabel}</span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </FormPrimitive.Control>
              <FormPrimitive.Message />
            </FormPrimitive.Item>
          </fieldset>
        );
      }}
    />
  );
};
