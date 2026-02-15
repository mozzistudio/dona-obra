import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
        {label && (
          <label className="text-sm font-medium text-gray-900">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none',
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

Textarea.displayName = 'Textarea';

export default Textarea;
