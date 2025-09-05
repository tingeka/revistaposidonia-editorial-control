// assets/js/settings/components/ArticlePicker.tsx

import { ContentSearch } from '@10up/block-components';
import { Button } from '@wordpress/components';
import { rotateLeft } from '@wordpress/icons';

import { usePickedArticle } from '../../hooks';
import { STRINGS } from '../../lib/i18n';
import { CoverArticleItem } from '../../types';
import { Preview } from '../ui';

interface ArticlePickerProps {
	label: string;
	selectedItems: CoverArticleItem[];
	onSelectItem: (items: CoverArticleItem[]) => void;
}

export const ArticlePicker = ({ label, selectedItems, onSelectItem }: ArticlePickerProps) => {
	// console.log(selectedItems);
	const [selectedPost] = selectedItems;
  const { post, featuredMediaUrl, authorName, isLoading } = usePickedArticle(selectedPost);
	
	const handleSelectItem = (item: CoverArticleItem) => onSelectItem([item]);
	const handleRemoveItem = () => onSelectItem([]);

	return (
		<div className="rp-ecs-cover-article">
			<label className="rp-ecs-cover-article__label">
				{label}
				{selectedPost && (
					<Button
						isDestructive
						variant="link"
						onClick={handleRemoveItem}
						icon={rotateLeft}
						iconSize={20}
						className="rp-ecs-cover-article__remove-button"
					/>
				)}
			</label>

			<ContentSearch
				placeholder={STRINGS.SEARCH_CONTENT}
				label={label}
				mode="post"
				contentTypes={['post']}
				onSelectItem={handleSelectItem}
				excludeItems={selectedPost ? [] : selectedItems}
			/>

			{isLoading ? (
        <div>{STRINGS.LOADING}</div>
      ) : (
        post && (
          <Preview className="rp-ecs-cover-article__preview">
            {featuredMediaUrl && (
              <div className="rp-ecs-cover-article__image-wrapper">
                <img
                  src={featuredMediaUrl}
                  alt={post.title?.rendered || ''}
                  className="rp-ecs-cover-article__image"
                />
              </div>
            )}
            <div className="rp-ecs-cover-article__text">
              <a href={post.link} target="_blank" rel="noreferrer" className="rp-ecs-cover-article__link">
                <h2 className="rp-ecs-cover-article__title">
                  {post.title?.rendered || '(No title)'}
                </h2>
              </a>
              <div className="rp-ecs-cover-article__meta">
                {post.date && <span>{new Date(post.date).toLocaleDateString()}</span>}
                {authorName && <span> — {authorName}</span>}
              </div>
            </div>
          </Preview>
        )
      )}
		</div>
	);
};
