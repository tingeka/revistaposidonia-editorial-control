// assets/js/settings/components/ArticlePicker.tsx
import { ContentSearch } from '@10up/block-components';
import { Button, ProgressBar } from '@wordpress/components';
import { rotateLeft } from '@wordpress/icons';

import { STRINGS } from '../../lib/i18n';

import type { ArticleItem } from '../../types';

interface ArticlePickerProps {
  label: string;
  selectedItem?: ArticleItem;
  isLoading?: boolean;
  onSelectItem: (item: ArticleItem) => void;
  onRemoveItem: () => void;
  renderPreview?: (item: ArticleItem) => React.ReactNode;
  contentMode?: 'post' | 'user' | 'term';
  contentTypes?: string[];
}

export const ArticlePicker = ({
  label,
  selectedItem,
  onSelectItem,
  onRemoveItem,
  isLoading = false,
  renderPreview,
  contentMode = 'post',
  contentTypes = ['post'],
}: ArticlePickerProps) => (
  <div className="rp-ecs-cover-article__picker">
    <span className="rp-ecs-cover-article__picker-label">
      {label}
      {selectedItem && (
        <Button
          isDestructive
          variant="link"
          onClick={onRemoveItem}
          icon={rotateLeft}
          iconSize={20}
          label={STRINGS.REMOVE}
        />
      )}
    </span>

    <ContentSearch
      placeholder={STRINGS.SEARCH_CONTENT}
      label={label}
      mode={contentMode}
      contentTypes={contentTypes}
      onSelectItem={onSelectItem}
      excludeItems={selectedItem ? [selectedItem] : []}
    />

    {isLoading && <ProgressBar />}

    {selectedItem && renderPreview && <>{renderPreview(selectedItem)}</>}
  </div>
);
