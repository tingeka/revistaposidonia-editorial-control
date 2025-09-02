import { useEntityRecords } from "@wordpress/core-data";
import { CoverArticlePreviewProps, WPPost } from "../types";

export const CoverArticlePreview = ({ postId }: CoverArticlePreviewProps) => {
	// Use only WPPost as type argument
	const posts = useEntityRecords<WPPost>('postType', 'post', {
		include: postId ? [postId] : [],
		_embed: true,
		per_page: 1,
	});

	if (!posts || !posts.records || !posts.records.length) return null;

	const post = posts.records[0];
	const featured_media_url = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
	const author_name = post._embedded?.author?.[0]?.name;

	return (
		<div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px', marginTop: '0.5em' }}>
			{featured_media_url && (
				<div style={{ aspectRatio: '16/9', width: '100%', overflow: 'hidden', borderRadius: '2px' }}>
					<img
						src={featured_media_url}
						alt={post.title?.rendered || ''}
						style={{ width: '100%', height: 'auto', objectFit: 'cover'}}
					/>
				</div>
			)}
			<div style={{ flex: 1 }}>
				<a href={post.link} target="_blank" rel="noreferrer" style={{textDecoration: 'none' }}>
					<h2 style={{ fontSize: '1rem',  fontWeight: 500, marginBottom: '4px' }}>
						{post.title?.rendered || '(No title)'}
					</h2>
				</a>
				<div style={{ fontSize: '0.75rem', color: '#555', marginTop: '4px' }}>
					{post.date && <span>{new Date(post.date).toLocaleDateString()}</span>}
					{author_name && <span> — {author_name}</span>}
				</div>
			</div>
		</div>
	);
};