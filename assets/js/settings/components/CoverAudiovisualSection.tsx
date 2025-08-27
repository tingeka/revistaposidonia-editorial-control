// js/settings/components/CoverAudiovisualSection.tsx
import { CoverAudiovisual } from './CoverAudiovisual';
import { CoverAudiovisualPreview } from './CoverAudiovisualPreview';

const AUDIOVISUAL_FIELDS = [
	{ key: 'title', label: 'Título del video', type: 'text' },
	{ key: 'url', label: 'URL del video', type: 'url' },
	{ key: 'desc', label: 'Descripción del video', type: 'textarea' },
];

export const CoverAudiovisualSection = ({ settings, onUpdateAudiovisual }) => {
  const hasAudiovisualData = AUDIOVISUAL_FIELDS.some(
    (field) => !!settings[field.key] && settings[field.key].toString().trim() !== ''
  );

  return (
    <div>
      <h2>Sección Audiovisual</h2>
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
