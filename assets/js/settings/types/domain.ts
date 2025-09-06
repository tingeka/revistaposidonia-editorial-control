// assets/js/settings/types/domain.ts
/**
 * Settings domain
 */
export interface Settings {
	cover: CoverSettings;
	[key: string]: any;
}

/**
 * Cover settings
 */
export interface CoverSettings {
	articles: CoverArticlesSettings;
	audiovisual: CoverAudiovisualSettings;
}

/**
 * Cover settings articles
 */
export interface ArticleItem {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
}

export interface CoverArticlesSettings {
  article_primary: ArticleItem[];
  article_secondary: ArticleItem[];
  article_tertiary: ArticleItem[];
}


/**
 * Cover settings audiovisual
 */
export interface CoverAudiovisualSettings {
  title: string;
  url: string;
  desc: string;
}

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