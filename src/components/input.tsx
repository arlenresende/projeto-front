import { Input as CustonInput } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { forwardRef, type ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  error?: string;
  isSlug?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, label, type, error, isSlug, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-sm text-[#262d34] font-medium" htmlFor={name}>
          {label}
        </Label>
        <div className="relative">
          {isSlug && (
            <span className="w-[150px] border border-r-0 flex items-center text-sm text-white font-medium absolute top-0 left-0 bg-[#465fff] px-2 h-full rounded-l-lg">
              cataloguei.com.br/
            </span>
          )}
          <CustonInput
            ref={ref}
            {...props}
            className={`border ${error ? 'border-red-500' : ''} ${isSlug ? 'pl-[160px]' : ''} `}
            type={type}
            id={name}
            placeholder={placeholder}
            name={name}
          />
        </div>

        {error && <p className="text-red-500 font-medium text-xs pt-1">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
