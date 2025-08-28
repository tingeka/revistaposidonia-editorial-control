import { STRINGS } from "../i18n";
export const CoverAudiovisualPreview = ({ titulo, desc, url }) => {
    const getEmbedUrl = (url) => {
        if (!url) return null;

        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }
        if (url.includes('vimeo.com/')) {
            const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
            return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
        }

        return null;
    };

    const embedUrl = getEmbedUrl(url);

    if (!titulo && !desc && !url) {
        return <p style={{ fontStyle: 'italic', color: '#666' }}>{STRINGS.NO_AUDIOVISUAL_CONTENT}</p>;
    }

    return (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                border: '1px solid #f1f1f1',
                borderRadius: '4px',
				width: '100%',
            }}
        >

            {embedUrl ? (
                <div style={{ width: '50%', height: 'min-content', backgroundColor: '#000' }}>
                    <iframe
                        src={embedUrl}
                        style={{ width: '100%', height: 'auto', border: 'none', aspectRatio: '16/9' }}
                        allowFullScreen
                    />
                </div>
            ) : url ? (
                <div
                    style={{
						padding: '0.5rem',
                        background: '#fff3cd',
                        border: '1px solid #ffeeba',
                        color: '#856404',
                        width: '50%',
                        wordBreak: 'break-word',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {STRINGS.EMBED_URL_NOT_COMPATIBLE}: {url}
                </div>
            ) : null}
			<div 
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '50%',
					flexGrow: 1
				}}>
				{titulo && <h3>{titulo}</h3>}
				{desc && <p>{desc}</p>}
			</div>
        </div>
    );
};
