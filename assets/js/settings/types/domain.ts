
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
export interface CoverArticleItem {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
  [key: string]: any; // for extra WP post fields
}

export interface CoverArticlesSettings {
  article_primary: CoverArticleItem[];
  article_secondary: CoverArticleItem[];
  article_tertiary: CoverArticleItem[];
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
export interface CoverArticleConfig {
  key: keyof CoverArticlesSettings;  // 'article_primary' | 'article_secondary' | 'article_tertiary'
  label: string;
}

/**
 * Form field configuration for audiovisual settings
 */
export interface CoverAudiovisualFieldConfig {
  key: keyof CoverAudiovisualSettings;
  label: string;
  type: 'text' | 'url' | 'textarea';
}