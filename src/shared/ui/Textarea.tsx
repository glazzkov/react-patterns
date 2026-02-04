import { ComponentProps, FC } from 'react';

import { cn } from '@/shared/utils/classNames';

type TextareaProps = ComponentProps<'textarea'> & {
  containerClassName?: string;
};

export const Textarea: FC<TextareaProps> = (props) => {
  const { className, value, maxLength = 500, containerClassName, ...rest } = props;

  return (
    <div className={cn('relative flex flex-col', containerClassName)}>
      <textarea
        value={value}
        maxLength={maxLength}
        data-slot="textarea"
        className={cn(
          'flex field-sizing-content min-h-30 w-full',
          'rounded-md border bg-transparent px-3 pt-2 pb-5',
          'text-base shadow-xs md:text-sm',
          'border-input',
          'placeholder:text-muted-foreground',
          'transition-[color,box-shadow] outline-none',
          'focus-visible:border-ring',
          'focus-visible:ring-ring/50',
          'focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20',
          'aria-invalid:border-destructive',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          className,
        )}
        {...rest}
      />
      {
        <span className="text-muted-foreground absolute right-3 bottom-1 text-xs">
          {String(value ?? '').length} / {maxLength}
        </span>
      }
    </div>
  );
};
