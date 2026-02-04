import * as LabelPrimitive from "@radix-ui/react-label";
import type { SlotProps } from "@radix-ui/react-slot";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, FC, HTMLAttributes, RefAttributes } from "react";
import { createContext, useContext, useId } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { Label } from "@/shared/ui/Label";
import { cn } from "@/shared/utils/classNames";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

type FormItemContextValue = {
  id: string;
};

type FormItemProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement>;
type FormLabelProps = ComponentProps<typeof LabelPrimitive.Root>;
type FormControlProps = SlotProps & RefAttributes<HTMLElement>;
type FormMessageProps = HTMLAttributes<HTMLParagraphElement> &
  RefAttributes<HTMLParagraphElement>;

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);
const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

/**
 * Hook to get form field information from context.
 *
 * Returns an object containing identifiers, field name, and field state.
 * Must be used within a <FormField> component.
 */
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext)
    throw new Error("useFormField should be used within <FormField>");

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/**
 * Wrapper for form fields that creates its own context for each form field
 * and tracks changes to that field.
 *
 * Required element for wrapping each form field.
 */
const FormFieldComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * Component that wraps an individual form field and links it by id with FormLabel and FormMessage.
 * Also necessary for accessibility.
 */
const FormItemComponent: FC<FormItemProps> = (props) => {
  const { className, ...restProps } = props;
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        {...restProps}
        className={cn("grid gap-2", className)}
        role="group"
      />
    </FormItemContext.Provider>
  );
};

/**
 * Component creates a label for the form field in the FormItem context.
 * Usage is optional.
 */
const FormLabelComponent: FC<FormLabelProps> = (props) => {
  const { className, ...rest } = props;
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...rest}
    />
  );
};

/**
 * Component decorates the form field using `Slot` from `@radix-ui/react-slot`.
 * Links the field with the label and ensures accessibility.
 */
const FormControlComponent: FC<FormControlProps> = (props) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      {...props}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
    />
  );
};

/**
 * Component displays the field error if present, or the passed
 * child content if there is no error.
 *
 * If `error` is present, it will be displayed as text.
 * If `error` is not present, the component will show the passed
 * child content.
 */
const FormMessageComponent: FC<FormMessageProps> = (props) => {
  const { children, className, ...restProps } = props;
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      {...restProps}
      className={cn("text-destructive text-sm", className)}
      id={formMessageId}
    >
      {body}
    </p>
  );
};

/**
 * Compound component for working with form primitives
 *
 * @example
 * ```tsx
 * <FormPrimitive {...form}>
 *   <FormPrimitive.Field
 *     control={form.control}
 *     name="email"
 *     render={({ field }) => (
 *       <FormPrimitive.Item>
 *         <FormPrimitive.Label>Email</FormPrimitive.Label>
 *         <FormPrimitive.Control>
 *           <input {...field} />
 *         </FormPrimitive.Control>
 *         <FormPrimitive.Message />
 *       </FormPrimitive.Item>
 *     )}
 *   />
 * </FormPrimitive>
 * ```
 */
export const FormPrimitive = Object.assign(FormProvider, {
  /**
   * Wrapper for form fields with context
   */
  Field: FormFieldComponent,

  /**
   * Container for an individual form field
   */
  Item: FormItemComponent,

  /**
   * Label for the form field
   */
  Label: FormLabelComponent,

  /**
   * Wrapper for form control (input, select, etc.)
   */
  Control: FormControlComponent,

  /**
   * Component for displaying validation errors
   */
  Message: FormMessageComponent,
});
