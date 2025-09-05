// assets/js/settings/components/ui/UrlField.tsx
import { TextControl } from '@wordpress/components';

import { BaseField } from './BaseField';

type UrlFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  validate?: (val: string) => string | null;
  className?: string;
};

export const UrlField = (props: UrlFieldProps) => (
  <BaseField<string> {...props} className={`field-url ${props.className || ''}`}>
    {({ value, onChange, help }) => (
      <TextControl value={value} onChange={onChange} help={help} type="url" />
    )}
  </BaseField>
);
