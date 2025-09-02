import { CoverArticleItem, CoverArticlesSettings, CoverArticleTypeKey } from "./articles";
import { CoverAudiovisualSettings } from "./audiovisual";
import { CoverSettings } from "./cover";

// Component props
export interface CoverSettingsProps {
  settings: CoverSettings;
  updateArticle: (articleType: CoverArticleTypeKey, items: CoverArticleItem[]) => void;
  updateAudiovisual: (field: keyof CoverAudiovisualSettings, value: string) => void;
}

export interface CoverArticlesSectionProps {
  settings: Partial<CoverArticlesSettings>;
  onUpdateArticle: (articleType: CoverArticleTypeKey, items: CoverArticleItem[]) => void;
}

export interface CoverArticleProps {
  label: string;
  selectedItems: CoverArticleItem[];
  onSelectItem: (items: CoverArticleItem[]) => void;
}

export interface CoverArticlePreviewProps {
  postId: number;
}

export interface CoverAudiovisualSectionProps {
  settings: CoverAudiovisualSettings;
  onUpdateAudiovisual: (field: keyof CoverAudiovisualSettings, value: string) => void;
}

export interface CoverAudiovisualProps {
  label: string;
  type: 'url' | 'text' | 'textarea';
  value: string;
  onChange: (value: string) => void;
}

export interface CoverAudiovisualPreviewProps {
  titulo?: string;
  desc?: string;
  url?: string;
}
