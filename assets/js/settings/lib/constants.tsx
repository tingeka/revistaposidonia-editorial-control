// assets/js/settings/constants.tsx
import { CoverArticleConfig, CoverAudiovisualFieldConfig } from '../types';
import { STRINGS } from './i18n';

export const ARTICLE_TYPES: CoverArticleConfig[] = [
  { key: 'article_primary', label: STRINGS.ARTICLE_PRIMARY },
  { key: 'article_secondary', label: STRINGS.ARTICLE_SECONDARY },
  { key: 'article_tertiary', label: STRINGS.ARTICLE_TERTIARY },
];

export const AUDIOVISUAL_FIELDS: CoverAudiovisualFieldConfig[] = [
  { key: 'title', label: STRINGS.VIDEO_TITLE, type: 'text' },
  { key: 'url', label: STRINGS.VIDEO_URL, type: 'url' },
  { key: 'desc', label: STRINGS.VIDEO_DESCRIPTION, type: 'textarea' },
];