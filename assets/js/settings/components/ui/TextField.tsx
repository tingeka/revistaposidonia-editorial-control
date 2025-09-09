import { TextControl } from '@wordpress/components';

import { BaseField } from './BaseField';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  help?: string; // added
  validationPath?: string;
  className?: string;
}

export const TextField = ({ help, ...props }: TextFieldProps) => (
  <BaseField<string> {...props} help={help} className={`field-text ${props.className || ''}`}>
    {({ value, onChange, help }) => (
      <TextControl value={value} onChange={onChange} help={help} />
    )}
  </BaseField>
);
