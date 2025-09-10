import { useCallback } from '@wordpress/element';

import { STRINGS } from '../../lib/i18n';
import { hasAudiovisualContent } from '../../lib/utils';
import { useSettingsStore } from '../../stores/settings';
import { Preview, Section, TextareaField, TextField, UrlField, VideoEmbed } from '../ui';

export const CoverAudiovisualModule = () => {
  // Subscribe to the whole audiovisual slice
  const audiovisual = useSettingsStore(state => state.settings.cover.audiovisual);

  // Get the updater function
  const setField = useSettingsStore(state => state.cover.updateAudiovisualField);

  // Stable callbacks
  const onChangeTitle = useCallback((val: string) => setField('title', val), [setField]);
  const onChangeUrl = useCallback((val: string) => setField('url', val), [setField]);
  const onChangeDesc = useCallback((val: string) => setField('desc', val), [setField]);

  return (
    <Section title={STRINGS.AUDIOVISUAL_SECTION}>
      <div className="rp-ecs-cover-audiovisual-section__fields">
        <TextField
          label={STRINGS.VIDEO_TITLE}
          value={audiovisual.title}
          onChange={onChangeTitle}
          help={useSettingsStore(state =>
            state.validationErrors.find(e => e.field === 'cover.audiovisual.title')?.message
          )}
        />
        <UrlField
          label={STRINGS.VIDEO_URL}
          value={audiovisual.url}
          onChange={onChangeUrl}
          help={useSettingsStore(state =>
            state.validationErrors.find(e => e.field === 'cover.audiovisual.url')?.message
          )}
        />
        <TextareaField
          label={STRINGS.VIDEO_DESCRIPTION}
          value={audiovisual.desc}
          onChange={onChangeDesc}
          help={useSettingsStore(state =>
            state.validationErrors.find(e => e.field === 'cover.audiovisual.desc')?.message
          )}
        />
      </div>

      {hasAudiovisualContent(audiovisual) && (
        <Preview className="rp-ecs-cover-audiovisual-section__preview" data-testid="audiovisual-preview">
          <VideoEmbed
            url={audiovisual.url}
            className="rp-ecs-cover-audiovisual-section__preview-embed"
          />
          <div className="rp-ecs-cover-audiovisual-section__preview-text">
            {audiovisual.title && <h3>{audiovisual.title}</h3>}
            {audiovisual.desc && <p>{audiovisual.desc}</p>}
          </div>
        </Preview>
      )}
    </Section>
  );
};
