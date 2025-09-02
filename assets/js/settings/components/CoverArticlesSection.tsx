// js/settings/components/CoverArticleSection.tsx
import { CoverArticle } from './CoverArticle';
import { STRINGS } from '../i18n';
import { CoverArticlesSectionProps, CoverArticleType } from '../types';

const ARTICLE_TYPES: CoverArticleType[] = [
	{ key: 'article_primary', label: STRINGS.ARTICLE_PRIMARY },
	{ key: 'article_secondary', label: STRINGS.ARTICLE_SECONDARY },
	{ key: 'article_tertiary', label: STRINGS.ARTICLE_TERTIARY },
];

export const CoverArticlesSection = ({ settings, onUpdateArticle }: CoverArticlesSectionProps) => {
	return (
		<div>
			<h2>{STRINGS.COVER_ARTICLES}</h2>
			<div style={{ display: 'flex', gap: '1rem' }}>
				{ARTICLE_TYPES.map(({ key, label }) => (
					<CoverArticle
						key={key}
						label={label}
						selectedItems={settings[key] || []}
						onSelectItem={(items) => onUpdateArticle(key, items)}
					/>
				))}
			</div>
		</div>
	);
};
