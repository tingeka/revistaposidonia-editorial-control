import { TextControl } from '@wordpress/components';

import { BaseField } from './BaseField';

interface UrlFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  help?: string; // added
  validationPath?: string;
  className?: string;
}

export const UrlField = ({ help, ...props }: UrlFieldProps) => (
  <BaseField<string> {...props} help={help} className={`field-url ${props.className || ''}`}>
    {({ value, onChange, help }) => (
      <TextControl value={value} onChange={onChange} help={help} type="url" />
    )}
  </BaseField>
);
