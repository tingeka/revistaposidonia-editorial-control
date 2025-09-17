// js/settings/lib/utils.tsx
import getVideoId from 'get-video-id';

import { CoverAudiovisualSettings } from '../lib/schemas';
import { AUDIOVISUAL_FIELDS } from './constants';

export const getEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  try {
    const parsed = new URL(url.trim());
    // normalize protocol + hostname
    parsed.protocol = parsed.protocol.toLowerCase();
    parsed.hostname = parsed.hostname.toLowerCase();
    const normalizedUrl = parsed.toString();

    const { id, service } = getVideoId(normalizedUrl);
    if (!id || !service) return null;

    if (service === 'youtube') return `https://www.youtube.com/embed/${id}`;
    if (service === 'vimeo') return `https://player.vimeo.com/video/${id}`;

    return null;
  } catch {
    return null;
  }
};

export const hasAudiovisualContent = (settings: CoverAudiovisualSettings): boolean => 
  AUDIOVISUAL_FIELDS.some(field => !!settings[field.key]?.trim());