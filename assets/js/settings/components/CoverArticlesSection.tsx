// js/settings/components/CoverArticleSection.tsx
import { CoverArticle } from './CoverArticle';

const ARTICLE_TYPES = [
	{ key: 'article_primary', label: 'Articulo Primario' },
	{ key: 'article_secondary', label: 'Articulo Secundario' },
	{ key: 'article_tertiary', label: 'Articulo Terciario' },
];

export const CoverArticlesSection = ({ settings, onUpdateArticle }) => {
	return (
		<div>
			<h2>Artículos de tapa</h2>
			<div style={{ display: 'flex', gap: '1rem' }}>
				{ARTICLE_TYPES.map(({ key, label }) => (
					<CoverArticle
						key={key}
						articleType={key}
						label={label}
						selectedItems={settings[key] || []}
						onSelectItem={(items) => onUpdateArticle(key, items)}
					/>
				))}
			</div>
		</div>
	);
};
