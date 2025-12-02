'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select');
  }
  return context;
};

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
}

const Select = ({ value, onValueChange, defaultValue = '', children }: SelectProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);

  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-dark-300/50 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-100/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn('h-4 w-4 opacity-50 transition-transform', open && 'rotate-180')}
        />
      </button>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value } = useSelectContext();
  return <span className={cn(!value && 'text-white/40')}>{value || placeholder}</span>;
};

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

const SelectContent = ({ children, className }: SelectContentProps) => {
  const { open, setOpen } = useSelectContext();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-md border border-white/10 bg-dark-200 shadow-lg animate-in fade-in-0 zoom-in-95',
        className
      )}
    >
      <div className="max-h-60 overflow-auto p-1">{children}</div>
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const SelectItem = ({ value, children, className }: SelectItemProps) => {
  const { value: selectedValue, onValueChange } = useSelectContext();
  const isSelected = value === selectedValue;

  return (
    <button
      type="button"
      onClick={() => onValueChange(value)}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm text-white outline-none hover:bg-white/10 focus:bg-white/10',
        isSelected && 'bg-gold-100/10',
        className
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4 text-gold-100" />}
      </span>
      {children}
    </button>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
