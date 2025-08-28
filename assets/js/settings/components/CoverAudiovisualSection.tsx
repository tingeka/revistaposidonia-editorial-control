// js/settings/components/CoverAudiovisualSection.tsx
import { CoverAudiovisual } from './CoverAudiovisual';
import { CoverAudiovisualPreview } from './CoverAudiovisualPreview';
import { STRINGS } from '../i18n';

const AUDIOVISUAL_FIELDS = [
	{ key: 'title', label: STRINGS.VIDEO_TITLE, type: 'text' },
	{ key: 'url', label: STRINGS.VIDEO_URL, type: 'url' },
	{ key: 'desc', label: STRINGS.VIDEO_DESCRIPTION, type: 'textarea' },
];

export const CoverAudiovisualSection = ({ settings, onUpdateAudiovisual }) => {
  const hasAudiovisualData = AUDIOVISUAL_FIELDS.some(
    (field) => !!settings[field.key] && settings[field.key].toString().trim() !== ''
  );

  return (
    <div>
      <h2>{STRINGS.AUDIOVISUAL_SECTION}</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {AUDIOVISUAL_FIELDS.map(({ key, label, type }) => (
          <CoverAudiovisual
            key={key}
            fieldKey={key}
            label={label}
            type={type}
            value={settings[key] || ''}
            onChange={(value) => onUpdateAudiovisual(key, value)}
          />
        ))}

        {hasAudiovisualData && (
          <CoverAudiovisualPreview
            titulo={settings.title}
            desc={settings.desc}
            url={settings.url}
          />
        )}
      </div>
    </div>
  );
};
