// assets/js/settings/types/domain.ts
import z from 'zod';

import {
    articleItemSchema, coverArticlesSchema, coverAudiovisualSchema, coverSettingsSchema,
    settingsSchema
} from '../lib/schemas';

/**
 * Article section configuration for constants
 */
export type CoverArticleConfig = {
  key: keyof CoverArticlesSettings;  // 'article_primary' | 'article_secondary' | 'article_tertiary'
  label: string;
}

/**
 * Form field configuration for audiovisual settings
 */
export type CoverAudiovisualFieldConfig = {
  key: keyof CoverAudiovisualSettings;
  label: string;
  type: 'text' | 'url' | 'textarea';
}

// Type inference from schemas
export type Settings = z.infer<typeof settingsSchema>;
export type CoverSettings = z.infer<typeof coverSettingsSchema>;
export type CoverArticlesSettings = z.infer<typeof coverArticlesSchema>;
export type CoverAudiovisualSettings = z.infer<typeof coverAudiovisualSchema>;
export type ArticleItem = z.infer<typeof articleItemSchema>;