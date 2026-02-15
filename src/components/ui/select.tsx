import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, fullWidth = false, options, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
        {label && (
          <label className="text-sm font-medium text-gray-900">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            'px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white',
            { 'border-red-500 focus:border-red-500': error },
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
