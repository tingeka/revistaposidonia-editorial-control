// assets/js/settings/types/props.ts
import {
    ArticleItem, CoverArticlesSettings, CoverAudiovisualSettings, CoverSettings
} from './domain';

// Component props
export interface CoverSettingsProps {
  settings: CoverSettings;
  updaters: CoverUpdaters;
}

export type CoverUpdaters = {
  updateArticle: (type: keyof CoverArticlesSettings, items: ArticleItem[]) => void;
  updateAudiovisual: (field: keyof CoverAudiovisualSettings, value: string) => void;
};

export interface CoverArticleProps {
  label: string;
  selectedItems: ArticleItem[];
  onSelectItem: (items: ArticleItem[]) => void;
}
