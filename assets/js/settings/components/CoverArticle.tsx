// js/settings/components/CoverArticle.tsx
import { ContentSearch } from "@10up/block-components";
import { CoverArticlePreview } from "./CoverArticlePreview";
import { STRINGS } from "../i18n";
import { Button } from "@wordpress/components";
import { rotateLeft } from "@wordpress/icons";
import { CoverArticleItem, CoverArticleProps } from '../types';

export const CoverArticle = ({ label, selectedItems, onSelectItem }: CoverArticleProps) => {
	const handleSelectItem = (item: CoverArticleItem) => {
		onSelectItem([item]);
	};

	const handleRemoveItem = () => {
		onSelectItem([]);
	};

	const postId = selectedItems[0]?.id;
	const hasSelection = selectedItems.length > 0 && postId;

	return (
		<div style={{ 
			display: 'flex', 
			flexDirection: 'column', 
			marginBottom: '1em', 
			flexGrow: 1, 
			flexBasis: '100%' 
		}}>
			<label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25em' }}>
				{label}
				{hasSelection && (
					<Button
						isDestructive
						variant="link"
						onClick={handleRemoveItem}
						icon={rotateLeft}
						iconSize={20}
						style={{ padding:0, minWidth: 'min-content' }}
					>
					</Button>
				)}
			</label>
			<ContentSearch
				placeholder={STRINGS.SEARCH_CONTENT}
				label={label}
				mode="post"
				contentTypes={['post', 'page']}
				onSelectItem={handleSelectItem}
				excludeItems={hasSelection ? [] : selectedItems}
			/>
			{postId && <CoverArticlePreview postId={postId} />}
		</div>
	);
};