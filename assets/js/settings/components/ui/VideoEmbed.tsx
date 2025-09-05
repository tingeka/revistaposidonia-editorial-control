// assets/js/settings/components/ui/VideoEmbed.tsx

import { STRINGS } from '../../i18n';
import { getEmbedUrl } from '../../utils';

type VideoEmbedProps = {
  url: string;
  className?: string;
  style?: React.CSSProperties;
};

export const VideoEmbed = ({ url, className = '', style }: VideoEmbedProps) => {
  const embedUrl = getEmbedUrl(url);

  if (!url) return null;

  return (
    <div className={`rp-ecs-video-embed ${className}`} style={style}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          role="document"
          allowFullScreen
          style={{ width: '100%', height: 'auto', aspectRatio: '16/9', border: 'none' }}
        />
      ) : (
        <div className="rp-ecs-video-embed__fallback">
          {STRINGS.EMBED_URL_NOT_COMPATIBLE}: {url}
        </div>
      )}
    </div>
  );
};
