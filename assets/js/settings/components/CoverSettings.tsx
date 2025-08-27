// js/settings/components/CoverSettings.tsx
import { CoverArticlesSection } from './CoverArticlesSection';
import { CoverAudiovisualSection } from './CoverAudiovisualSection';

export const CoverSettings = ({ settings, updateArticle, updateAudiovisual }) => {
	return (
		<div>
			<CoverArticlesSection 
				settings={settings.articles || {}}
				onUpdateArticle={updateArticle}
			/>
			<hr />
			<CoverAudiovisualSection
				settings={settings.audiovisual || {}}
				onUpdateAudiovisual={updateAudiovisual}
			/>
		</div>
	);
};