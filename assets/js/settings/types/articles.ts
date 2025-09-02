export type CoverArticleTypeKey = 'article_primary' | 'article_secondary' | 'article_tertiary';

export interface CoverArticleItem {
  id: number;
  title?: string;
  link?: string;
  date?: string;
  [key: string]: any; // For additional WP post fields
}

export interface CoverArticleType {
  key: CoverArticleTypeKey;
  label: string;
}

export type CoverArticlesSettings = {
	[K in CoverArticleTypeKey]: CoverArticleItem[]
}