export interface CoverAudiovisualSettings {
  title: string;
  url: string;
  desc: string;
}

export interface CoverAudiovisualField {
  key: keyof CoverAudiovisualSettings;
  label: string;
  type: 'url' | 'text' | 'textarea';
}