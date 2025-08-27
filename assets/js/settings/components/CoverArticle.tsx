// js/settings/components/CoverArticle.tsx
import { ContentSearch } from "@10up/block-components";
import { CoverArticlePreview } from "./CoverArticlePreview";

export const CoverArticle = ({ articleType, label, selectedItems, onSelectItem }) => {
	const handleSelectItem = (item) => {
		onSelectItem([item]);
	};

	const postId = selectedItems[0]?.id;

	return (
		<div style={{ 
			display: 'flex', 
			flexDirection: 'column', 
			marginBottom: '1em', 
			flexGrow: 1, 
			flexBasis: '100%' 
		}}>
			<label style={{ display: 'block', marginBottom: '0.25em' }}>
				{label}
			</label>
			<ContentSearch
				placeholder="Buscar contenido..."
				label={label}
				mode="post"
				contentTypes={['post', 'page']}
				onSelectItem={handleSelectItem}
				excludeItems={selectedItems}
			/>
			{postId && <CoverArticlePreview postId={postId} />}
		</div>
	);
};