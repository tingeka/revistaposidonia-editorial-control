// assets/js/settings/components/ui/TextField.tsx
import { TextControl } from '@wordpress/components';

import { BaseField } from './BaseField';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  validate?: (val: string) => string | null;
  className?: string;
};

export const TextField = (props: TextFieldProps) => (
  <BaseField<string> {...props} className={`field-text ${props.className || ''}`}>
    {({ value, onChange, help }) => (
      <TextControl value={value} onChange={onChange} help={help} />
    )}
  </BaseField>
);