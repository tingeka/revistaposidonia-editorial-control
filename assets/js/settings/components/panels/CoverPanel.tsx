// js/settings/components/CoverSettings.tsx

import { ARTICLE_TYPES } from '../../constants';
import { STRINGS } from '../../i18n';
import { CoverSettingsProps } from '../../types';
import { hasAudiovisualContent, validateAudiovisualField } from '../../utils';
import { ArticlePicker } from '../features';
import { Preview, Section, TextareaField, TextField, UrlField, VideoEmbed } from '../ui';

export const CoverPanel = ({ settings, updaters }: CoverSettingsProps) => (
  <div className="rp-ecs-cover-settings">
    <Section title={STRINGS.COVER_ARTICLES}>
      <div className="rp-ecs-cover-articles">
        {ARTICLE_TYPES.map(({ key, label }) => (
          <ArticlePicker
            key={key}
            label={label}
            selectedItems={settings.articles[key] || []}
            onSelectItem={(items) => updaters.updateArticle(key, items)}
          />
        ))}
      </div>
    </Section>

    <hr />

    <Section title={STRINGS.AUDIOVISUAL_SECTION}>
      <div className="rp-ecs-cover-audiovisual-section__fields">
        <TextField
          label={STRINGS.VIDEO_TITLE}
          value={settings.audiovisual.title || ''}
          onChange={(val) => updaters.updateAudiovisual('title', val)}
          validate={(val) => validateAudiovisualField('text', val)}
        />
        <UrlField
          label={STRINGS.VIDEO_URL}
          value={settings.audiovisual.url || ''}
          onChange={(val) => updaters.updateAudiovisual('url', val)}
          validate={(val) => validateAudiovisualField('url', val)}
        />
        <TextareaField
          label={STRINGS.VIDEO_DESCRIPTION}
          value={settings.audiovisual.desc || ''}
          onChange={(val) => updaters.updateAudiovisual('desc', val)}
          validate={(val) => validateAudiovisualField('textarea', val)}
        />
      </div>

      {hasAudiovisualContent(settings.audiovisual) && (
        <Preview className="rp-ecs-cover-audiovisual-section__preview">
          <VideoEmbed url={settings.audiovisual.url} className="rp-ecs-cover-audiovisual-section__preview-embed" />
          <div className="rp-ecs-cover-audiovisual-section__preview-text">
            {settings.audiovisual.title && <h3>{settings.audiovisual.title}</h3>}
            {settings.audiovisual.desc && <p>{settings.audiovisual.desc}</p>}
          </div>
        </Preview>
      )}
    </Section>
  </div>
);