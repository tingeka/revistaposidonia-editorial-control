import { STRINGS } from './i18n';
import { CoverValidationFieldType, CoverValidationResult } from './types';

export const getEmbedUrl = (url: string): string | null => {
	if (!url) return null;

	if (url.includes('youtube.com/watch?v=')) {
		const videoId = url.split('v=')[1]?.split('&')[0];
		return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
	}
	if (url.includes('youtu.be/')) {
		const videoId = url.split('youtu.be/')[1]?.split('?')[0];
		return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
	}
	if (url.includes('vimeo.com/')) {
		const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
		return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
	}

	return null;
};

export const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

export const validateAudiovisualField = (fieldType: CoverValidationFieldType, value: string): CoverValidationResult => {
	if (fieldType === 'url' && value.trim() && !isValidUrl(value)) {
		return STRINGS.VALID_URL_REQUIRED;
	}
	return null;
};