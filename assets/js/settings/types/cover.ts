import { CoverArticlesSettings } from './articles';
import { CoverAudiovisualSettings } from './audiovisual';

export interface CoverSettings {
  articles: CoverArticlesSettings;
  audiovisual: CoverAudiovisualSettings;
}