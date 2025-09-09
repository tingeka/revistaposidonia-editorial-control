// assets/js/settings/types/utils.ts
export type ValidationFieldType = 'url' | 'text' | 'textarea';
export type ValidationResult = string | null;
export type ValidationError = {
  field: string; // e.g., 'url', 'title', 'cover.articles.article_primary'
  message: string; // plain string describing the problem
};