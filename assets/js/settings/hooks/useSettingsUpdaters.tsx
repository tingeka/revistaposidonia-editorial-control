// assets/js/settings/hooks/useSettingsUpdaters.tsx
import {
    CoverArticleItem, CoverArticlesSettings, CoverAudiovisualSettings, CoverUpdaters
} from '../types';

export const useSettingsUpdaters = (
  updateSetting: (section: 'cover', updater: (prev: any) => any) => void
) => {
  const cover: CoverUpdaters = {
    updateArticle: (type: keyof CoverArticlesSettings, items: CoverArticleItem[]) => {
        console.log(type, items);
      updateSetting('cover', prev => ({
        ...prev,
        articles: {
          ...prev.articles,
          [type]: items,
        },
      }));
    },
    updateAudiovisual: (field: keyof CoverAudiovisualSettings, value: string) => {
      console.log(field, value);
      updateSetting('cover', prev => ({
        ...prev,
        audiovisual: {
          ...prev.audiovisual,
          [field]: value,
        },
      }));
    },
  };

  return { cover };
};
