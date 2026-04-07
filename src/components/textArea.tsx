import { Textarea as CustonTextarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { forwardRef, type ComponentProps } from 'react';

interface TextareaProps extends ComponentProps<'textarea'> {
  name: string;
  placeholder?: string;
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, placeholder, label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={name}>{label}</Label>}
        <CustonTextarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`border ${error ? 'border-red-500' : ''} ${className ?? ''}`}
          {...props}
        />
        {error && <p className="text-red-500 font-medium text-xs pt-1">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
