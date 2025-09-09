import { TextareaControl } from '@wordpress/components';

import { BaseField } from './BaseField';

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  help?: string; // added
  validationPath?: string;
  className?: string;
}

export const TextareaField = ({ help, ...props }: TextareaFieldProps) => (
  <BaseField<string> {...props} help={help} className={`field-textarea ${props.className || ''}`}>
    {({ value, onChange, help }) => (
      <TextareaControl value={value} onChange={onChange} help={help} />
    )}
  </BaseField>
);
