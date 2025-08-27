// js/settings/components/CoverAudiovisualField.tsx
import { useState } from '@wordpress/element';
import { TextareaControl, TextControl } from '@wordpress/components';
import { validateAudiovisualField } from '../utils';
import { CSSProperties } from 'react';

export const CoverAudiovisual = ({ fieldKey, label, type, value, onChange }) => {
	const [error, setError] = useState<string | null>(null);

	const handleChange = (val) => {
		const validationError = validateAudiovisualField(type, val);
		setError(validationError);
		onChange(val);
	};

	const commonProps = {
		label,
		value,
		onChange: handleChange,
		style: { width: '100%' },
		help: error || undefined,
	};

	const fieldStyle: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		flexBasis: type === 'textarea' ? '100%' : 'calc(50% - 0.5rem)',
	};

	return (
		<div style={fieldStyle}>
			{type === 'textarea' ? (
				<TextareaControl {...commonProps} />
			) : (
				<TextControl {...commonProps} type={type} />
			)}
		</div>
	);
};