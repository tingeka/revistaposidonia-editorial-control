// assets/js/settings/components/ui/TextareaField.tsx
import { TextareaControl } from '@wordpress/components';

import { BaseField } from './BaseField';

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  validate?: (val: string) => string | null;
  className?: string;
};

export const TextareaField = (props: TextareaFieldProps) => (
  <BaseField<string> {...props} className={`field-textarea ${props.className || ''}`}>
    {({ value, onChange, help }) => (
      <TextareaControl value={value} onChange={onChange} help={help} />
    )}
  </BaseField>
);
