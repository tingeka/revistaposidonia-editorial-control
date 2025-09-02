import { CoverSettings } from './cover';
import { CoverArticleTypeKey } from './articles';
import { CoverAudiovisualSettings } from './audiovisual';

export interface Settings {
  cover: CoverSettings;
  [key: string]: any;
}

export type SettingsKey = keyof Settings;

export interface UseSettingsReturn {
  settings: Settings;
  loading: boolean;
  saving: boolean;
  hasUnsavedChanges: boolean;
  updateSetting: (section: SettingsKey, updates: any) => void;
  updateArticle: (articleType: CoverArticleTypeKey, items: any[]) => void;
  updateAudiovisual: (field: keyof CoverAudiovisualSettings, value: string) => void;
  saveSettings: () => Promise<boolean>;
}

export type SettingUpdates = 
  | { cover: Partial<CoverSettings> }
  | { [key: string]: any };
