// assets/js/settings/components/ArticlePicker.tsx

import { ContentSearch } from '@10up/block-components';
import { Button, ProgressBar } from '@wordpress/components';
import { rotateLeft } from '@wordpress/icons';

import { usePickedArticle } from '../../hooks';
import { STRINGS } from '../../lib/i18n';
import { ArticleItem } from '../../types';
import { Preview } from '../ui';

interface ArticlePickerProps {
	label: string;
	selectedItems: ArticleItem[];
	onSelectItem: (items: ArticleItem[]) => void;
}

export const ArticlePicker = ({ label, selectedItems, onSelectItem }: ArticlePickerProps) => {
	// console.log(selectedItems);
	const [selectedPost] = selectedItems;
  const { picked, isLoading } = usePickedArticle(selectedPost);
	
	const handleSelectItem = (item: ArticleItem) => onSelectItem([item]);
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
        <ProgressBar />
      ) : (
        picked && (
          <Preview className="rp-ecs-cover-article__preview">
            {picked.featuredMediaUrl && (
              <div className="rp-ecs-cover-article__image-wrapper">
                <img
                  src={picked.featuredMediaUrl}
                  alt={picked.title || ''}
                  className="rp-ecs-cover-article__image"
                />
              </div>
            )}
            <div className="rp-ecs-cover-article__text">
              <a href={picked.url} target="_blank" rel="noreferrer" className="rp-ecs-cover-article__link">
                <h2 className="rp-ecs-cover-article__title">
                  {picked.title || ''}
                </h2>
              </a>
              <div className="rp-ecs-cover-article__meta">
                {picked.date && <span>{new Date(picked.date).toLocaleDateString()}</span>}
                {picked.author && <span> — {picked.author}</span>}
              </div>
            </div>
          </Preview>
        )
      )}
		</div>
	);
};
