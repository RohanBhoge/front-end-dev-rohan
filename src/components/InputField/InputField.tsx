import React from 'react';

// A much simpler props interface for now
export interface InputFieldProps {
  label?: string;
  value?: string;
}

// A simplified component without CVA, icons, or complex variants
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, value, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          value={value}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
      </div>
    );
  }
);

InputField.displayName = 'InputField';