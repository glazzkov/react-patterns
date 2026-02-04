import { ReactElement } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useFormContext,
  UseFormStateReturn,
} from 'react-hook-form';

import { FormPrimitive } from '@/shared/ui/FormPrimitive';

export type FormFieldRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;

  render: (props: FormFieldRenderProps<TFieldValues, TName>) => ReactElement;
};

/**
 * Component for rendering custom fields in the form
 *
 * Uses render prop pattern for maximum flexibility
 * Passes field props that need to be spread into the custom input
 *
 * @example
 * ```tsx
 * <Form
 *   form={form}
 *   render={(Fields) => (
 *     <Fields.Field
 *       name="customDate"
 *       render={({ field, fieldState }) => (
 *         <FormItem>
 *           <FormLabel>Date</FormLabel>
 *           <FormControl>
 *             <DatePicker
 *               value={field.value}
 *               onChange={field.onChange}
 *             />
 *           </FormControl>
 *           {fieldState.error && (
 *             <FormMessage>{fieldState.error.message}</FormMessage>
 *           )}
 *         </FormItem>
 *       )}
 *     />
 *   )}
 * />
 * ```
 */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormFieldProps<TFieldValues, TName>,
) => {
  const { name, render } = props;

  const form = useFormContext<TFieldValues>();

  return (
    <FormPrimitive.Field
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => render({ field, fieldState, formState })}
    />
  );
};
