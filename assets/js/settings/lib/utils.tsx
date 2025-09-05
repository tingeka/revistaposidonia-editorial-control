// assets/js/settings/utils.tsx
import { CoverAudiovisualSettings, ValidationFieldType, ValidationResult } from '../types';
import { AUDIOVISUAL_FIELDS } from './constants';
import { STRINGS } from './i18n';

export const getEmbedUrl = (url: string): string | null => {
	if (!url) return null;

	let parsed: URL;
	try {
		parsed = new URL(url); // only this can realistically throw
	} catch {
		return null; // fail gracefully for invalid URLs
	}

	if (parsed.hostname.includes('youtube.com')) {
		const videoId = parsed.searchParams.get('v');
		if (!videoId) return null;

		return `https://www.youtube.com/embed/${videoId}`;
	}

	// YouTube short URLs
	if (parsed.hostname === 'youtu.be') {
		const videoId = parsed.pathname.slice(1); // remove leading '/'
		if (!videoId) return null;

		return `https://www.youtube.com/embed/${videoId}`;
	}

	// Vimeo URLs
	if (parsed.hostname.includes('vimeo.com')) {
		const videoId = parsed.pathname.split('/')[1];
		if (!videoId) return null;

		return `https://player.vimeo.com/video/${videoId}`;
	}

	return null;
};

export const isValidUrl = (url: string): boolean => {
	try {
		const parsed = new URL(url);
		// hostname must be non-empty and contain at least one alphanumeric character
		if (!parsed.hostname || !/[a-z0-9]/i.test(parsed.hostname)) {
			return false;
		}
		return true;
	} catch {
		return false; // syntactically invalid URLs
	}
};


export const validateAudiovisualField = (fieldType: ValidationFieldType, value: string): ValidationResult => {
	if (fieldType === 'url' && value.trim() && !isValidUrl(value)) {
		return STRINGS.VALID_URL_REQUIRED;
	}
	return null;
};

export const hasAudiovisualContent = (settings: CoverAudiovisualSettings): boolean => 
  AUDIOVISUAL_FIELDS.some(field => !!settings[field.key]?.trim());