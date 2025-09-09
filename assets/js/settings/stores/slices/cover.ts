// js/settings/stores/slices/cover.ts
import type { StateCreator } from 'zustand';
import {
    coverArticlesSchema, coverAudiovisualSchema, ValidationError, zodErrorsToValidationErrors
} from '../../lib/schemas';

import type { Settings } from '../../lib/schemas';
import type { SettingsStore } from '../settings';

export interface CoverSlice {
  updateAudiovisualField: (field: keyof Settings['cover']['audiovisual'], value: string) => void;
  updateArticles: (
    type: keyof Settings['cover']['articles'],
    items: Settings['cover']['articles'][keyof Settings['cover']['articles']]
  ) => void;
  validateField: (field: string, value: any) => ValidationError | null;
}

export const createCoverSlice: StateCreator<SettingsStore, [], [], CoverSlice> = (set, get, store) => ({
  updateAudiovisualField: (field, value) => {
    get().updateSetting('cover', (cover) => ({
      ...cover,
      audiovisual: { ...cover.audiovisual, [field]: value },
    }));
  },

  updateArticles: (type, items) => {
    get().updateSetting('cover', (cover) => ({
      ...cover,
      articles: { ...cover.articles, [type]: items },
    }));
  },

  validateField: (field, value) => {
    try {
      const { audiovisual, articles } = get().settings.cover;
      if (field in audiovisual) {
        coverAudiovisualSchema.pick({ [field]: true }).parse({ [field]: value });
      } else if (field in articles) {
        coverArticlesSchema.pick({ [field]: true }).parse({ [field]: value });
      }
      return null;
    } catch (err: any) {
      return zodErrorsToValidationErrors(err)[0] ?? null;
    }
  },
});
