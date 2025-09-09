// js/settings/lib/schemas.ts
import { z } from 'zod';

import { STRINGS } from './i18n';

// Custom URL validation that matches your current logic
const urlSchema = z
  .string()
  .refine(
    (url) => {
      if (!url.trim()) return true; // Allow empty URLs
      
      try {
        const parsed = new URL(url);
        // hostname must be non-empty and contain at least one alphanumeric character
        return parsed.hostname && /[a-z0-9]/i.test(parsed.hostname);
      } catch {
        return false;
      }
    },
    {
      message: STRINGS.VALID_URL_REQUIRED,
    }
  );

// Article item schema
export const articleItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  type: z.string(),
  subtype: z.string(),
});

// Cover articles settings schema
export const coverArticlesSchema = z.object({
  article_primary: z.array(articleItemSchema).default([]),
  article_secondary: z.array(articleItemSchema).default([]),
  article_tertiary: z.array(articleItemSchema).default([]),
});

// Cover audiovisual settings schema
export const coverAudiovisualSchema = z.object({
  title: z.string().default(''),
  url: urlSchema.default(''),
  desc: z.string().default(''),
});

// Cover settings schema
export const coverSettingsSchema = z.object({
  articles: coverArticlesSchema.default(() => ({
    article_primary: [],
    article_secondary: [],
    article_tertiary: [],
  })),
  audiovisual: coverAudiovisualSchema.default(() => ({
    title: '',
    url: '',
    desc: '',
  })),
});

// Main settings schema
export const settingsSchema = z.object({
  cover: coverSettingsSchema.default(() => ({
    articles: {
      article_primary: [],
      article_secondary: [],
      article_tertiary: [],
    },
    audiovisual: {
      title: '',
      url: '',
      desc: '',
    },
  })),
});

// Type inference from schemas
export type ArticleItem = z.infer<typeof articleItemSchema>;
export type CoverArticlesSettings = z.infer<typeof coverArticlesSchema>;
export type CoverAudiovisualSettings = z.infer<typeof coverAudiovisualSchema>;
export type CoverSettings = z.infer<typeof coverSettingsSchema>;
export type Settings = z.infer<typeof settingsSchema>;

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

// Helper to convert Zod errors to your ValidationError format
export const zodErrorsToValidationErrors = (
  zodError: z.ZodError,
  prefix = ''
): ValidationError[] => {
  return zodError.issues.map((issue) => ({
    field: prefix ? `${prefix}.${issue.path.join('.')}` : issue.path.join('.'),
    message: issue.message,
  }));
};