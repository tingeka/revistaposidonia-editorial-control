// js/settings/lib/utils.tsx
import { CoverAudiovisualSettings } from '../lib/schemas';
import { AUDIOVISUAL_FIELDS } from './constants';

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

export const hasAudiovisualContent = (settings: CoverAudiovisualSettings): boolean => 
  AUDIOVISUAL_FIELDS.some(field => !!settings[field.key]?.trim());