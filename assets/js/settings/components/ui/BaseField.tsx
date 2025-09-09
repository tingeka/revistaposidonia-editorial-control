// js/settings/components/ui/BaseField.tsx

interface BaseFieldProps<T> {
  label: string;
  value: T;
  onChange: (val: T) => void;
  className?: string;
  help?: string; // added
  children: (props: {
    value: T;
    onChange: (val: T) => void;
    help?: string;
  }) => React.ReactNode;
}

export const BaseField = <T,>({
  label,
  value,
  onChange,
  className = '',
  help,
  children,
}: BaseFieldProps<T>) => {
  return (
    <div className={`rp-ecs-field ${className}`}>
      <label className="rp-ecs-field__label">{label}</label>
      {children({ value, onChange, help })}
    </div>
  );
};
