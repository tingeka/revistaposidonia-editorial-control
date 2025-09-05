// components/ui/BaseField.tsx
import { useState } from '@wordpress/element';

type BaseFieldProps<T> = {
  label: string;
  value: T;
  onChange: (val: T) => void;
  validate?: (val: T) => string | null;
  className?: string;
  children: (props: {
    value: T;
    onChange: (val: T) => void;
    help?: string;
  }) => React.ReactNode;
};

export const BaseField = <T,>({
  label,
  value,
  onChange,
  validate,
  className = '',
  children,
}: BaseFieldProps<T>) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (val: T) => {
    if (validate) setError(validate(val));
    onChange(val);
  };

  return (
    <div className={`rp-ecs-field ${className}`}>
      <label className="rp-ecs-field__label">{label}</label>
      {children({ value, onChange: handleChange, help: error || undefined })}
    </div>
  );
};
