import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
        {label && (
          <label className="text-sm font-medium text-gray-900">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            { 'border-red-500 focus:border-red-500': error },
            className
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
