// assets/js/settings/components/modules/CoverArticlesModule.tsx
import { ProgressBar } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';

import { usePostWithEmbeds } from '../../hooks';
import { ARTICLE_TYPES } from '../../lib/constants';
import { STRINGS } from '../../lib/i18n';
import { useSettingsStore } from '../../stores/settings';
import { ArticleItem, WPPost } from '../../types';
import { ArticlePicker } from '../features';
import { Preview, Section } from '../ui';

// Preview component that safely fetches and renders picked article
const PickedArticlePreview = ({ selectedItem, label }: { selectedItem?: ArticleItem; label: string }) => {
  const postId = selectedItem?.id;

  if (!postId) return null;

  const { post, isLoading } = usePostWithEmbeds(postId);

  if (isLoading) return <ProgressBar />; // render loading

  if (!post || !selectedItem) return null;

  const picked = {
    id: post.id,
    title: post.title?.rendered ?? '',
    url: post.link ?? '',
    type: selectedItem.type,
    subtype: selectedItem.subtype,
    date: post.date ?? '',
    author: post._embedded?.author?.[0]?.name ?? '',
    featuredMediaUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',
  };

  return (
    <Preview className="rp-ecs-cover-article__preview" data-testid={`picked-article-${picked.id}`}>
      {picked.featuredMediaUrl && (
        <div className="rp-ecs-cover-article__image-wrapper" data-testid={`picked-article-${picked.id}-image`}>
          <img
            src={picked.featuredMediaUrl}
            alt={picked.title || ''}
            className="rp-ecs-cover-article__image"
          />
        </div>
      )}
      <div className="rp-ecs-cover-article__text">
        {picked.url && (
          <a href={picked.url} target="_blank" rel="noreferrer" className="rp-ecs-cover-article__link" data-testid={`picked-article-${picked.id}-link`} >
            <h2 className="rp-ecs-cover-article__title">{picked.title || ''}</h2>
          </a>
        )}
        {/* Only render meta if at least one field exists */}
        {(picked.date || picked.author) && (
          <div className="rp-ecs-cover-article__meta" data-testid={`picked-article-${picked.id}-meta`}>
            {picked.date && <span data-testid={`picked-article-${picked.id}-date`}>{new Date(picked.date).toLocaleDateString()}</span>}
            {picked.date && picked.author && <span> — </span>}
            {picked.author && <span data-testid={`picked-article-${picked.id}-author`}>{picked.author}</span>}
          </div>
        )}
      </div>
    </Preview>
  );
};

export const CoverArticlesModule = () => {
  const articles = useSettingsStore((state) => state.settings.cover.articles);
  const updateArticles = useSettingsStore((state) => state.cover.updateArticles);

  return (
    <Section title={STRINGS.COVER_ARTICLES}>
      <div className="rp-ecs-cover-articles">
        {ARTICLE_TYPES.map(({ key, label }) => {
          const selectedItem = articles[key]?.[0]; // raw ArticleItem

          return (
            <div key={key} className="rp-ecs-cover-article">
              {/* Dumb picker */}
              <ArticlePicker
                label={label}
                selectedItem={selectedItem}
                onSelectItem={(item) => updateArticles(key, [item])}
                onRemoveItem={() => updateArticles(key, [])}
                contentMode="post"
              />

              {/* External preview */}
              {selectedItem && <PickedArticlePreview selectedItem={selectedItem} label={label} />}
            </div>
          );
        })}
      </div>
    </Section>
  );
};