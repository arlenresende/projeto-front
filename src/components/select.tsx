import { Label } from '@radix-ui/react-label';
import { ChevronDown } from 'lucide-react';
import { forwardRef, type ComponentProps } from 'react';

interface SelectProps extends ComponentProps<'select'> {
  name: string;
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, label, error, className, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={name}>{label}</Label>}
        <div className="relative">
          <select
            ref={ref}
            {...props}
            id={name}
            name={name}
            className={`appearance-none h-9 w-full min-w-0 rounded-md border px-3 pr-8 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${error ? 'border-red-500' : 'border-input'} ${className ?? ''}`}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        {error && <p className="text-red-500 font-medium text-xs pt-1">{error}</p>}
      </div>
    );
  },
);
Select.displayName = 'Select';
