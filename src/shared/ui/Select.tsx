import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

import { cn } from '@/shared/utils/classNames';

export interface SelectProps<T = string> {
  items: T[];
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: ReactNode;
  extractValue?: (item: T) => string;
  renderValue?: (item: T) => ReactNode;
  className?: string;
  size?: 'sm' | 'default';
  disabled?: boolean;
  invalid?: boolean;
  clearable?: boolean;
}

export const Select = <T,>(props: SelectProps<T>) => {
  const {
    items,
    value,
    onChange,
    placeholder,
    extractValue = (item: T) => String(item),
    renderValue = (item: T) => String(item),
    className,
    size = 'md',
    disabled,
    invalid,
    clearable,
  } = props;

  // Normalize data to Record: { [key: string]: ReactNode }
  const itemsRecord = useMemo(() => {
    const record: Record<string, ReactNode> = {};
    items.forEach((item) => {
      const key = extractValue(item);
      record[key] = renderValue(item);
    });
    return record;
  }, [items, extractValue, renderValue]);

  // Get keys array for rendering list
  const itemKeys = useMemo(() => Object.keys(itemsRecord), [itemsRecord]);

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.(undefined);
  };

  const showClearButton = clearable && !!value;

  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        data-size={size}
        aria-invalid={invalid}
        className={cn(
          'flex w-fit min-w-0 items-center justify-between gap-2',
          'rounded-md border bg-transparent px-3 py-2',
          'text-sm whitespace-nowrap shadow-xs',
          'border-input',
          'data-placeholder:text-muted-foreground',
          "[&_svg:not([class*='text-'])]:text-muted-foreground",
          'transition-[color,box-shadow] outline-none',
          'focus-visible:border-ring',
          'focus-visible:ring-ring/50',
          'focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20',
          'aria-invalid:border-destructive',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          'data-[size=md]:h-9',
          'data-[size=sm]:h-8',
          '[&_svg]:pointer-events-none',
          '[&_svg]:shrink-0',
          "[&_svg:not([class*='size-'])]:size-4",
          className,
        )}
      >
        <SelectPrimitive.Value asChild placeholder={placeholder}>
          <span className="grow truncate text-start">
            {value !== undefined && itemsRecord[value] !== undefined ? itemsRecord[value] : null}
          </span>
        </SelectPrimitive.Value>
        {showClearButton && (
          <button
            type="button"
            onMouseDown={handleClear}
            onClick={handleClear}
            className="pointer-events-auto shrink-0 opacity-50 transition-opacity hover:opacity-100"
          >
            <XIcon className="size-4" />
          </button>
        )}
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="select-content"
          className={cn(
            'bg-popover text-popover-foreground',
            'relative z-50 w-(--radix-select-trigger-width)',
            'max-h-(--radix-select-content-available-height)',
            'origin-(--radix-select-content-transform-origin)',
            'overflow-x-hidden overflow-y-auto',
            'rounded-md border shadow-md',
            'data-[state=open]:animate-in',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0',
            'data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95',
            'data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'data-[side=bottom]:translate-y-1',
            'data-[side=left]:-translate-x-1',
            'data-[side=right]:translate-x-1',
            'data-[side=top]:-translate-y-1',
          )}
          position="popper"
        >
          <SelectPrimitive.ScrollUpButton
            data-slot="select-scroll-up-button"
            className="flex cursor-default items-center justify-center py-1"
          >
            <ChevronUpIcon className="size-4" />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport
            className={cn(
              'p-1',
              'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1',
            )}
          >
            {itemKeys.map((key) => {
              return (
                <SelectPrimitive.Item
                  key={key}
                  value={key}
                  data-slot="select-item"
                  className={cn(
                    'relative flex w-full cursor-default items-center gap-2',
                    'rounded-sm py-1.5 pr-8 pl-2 text-sm',
                    'outline-hidden select-none',
                    'focus:bg-accent',
                    'focus:text-accent-foreground',
                    "[&_svg:not([class*='text-'])]:text-muted-foreground",
                    'data-disabled:pointer-events-none',
                    'data-disabled:opacity-50',
                    '[&_svg]:pointer-events-none',
                    '[&_svg]:shrink-0',
                    "[&_svg:not([class*='size-'])]:size-4",
                  )}
                >
                  <span className="absolute right-2 flex size-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <CheckIcon className="size-4" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText asChild>
                    <span className="truncate">{itemsRecord[key]}</span>
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              );
            })}
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton
            data-slot="select-scroll-down-button"
            className="flex cursor-default items-center justify-center py-1"
          >
            <ChevronDownIcon className="size-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
