// js/settings/components/CoverSettings.tsx
import { CoverArticlesSection } from './CoverArticlesSection';
import { CoverAudiovisualSection } from './CoverAudiovisualSection';
import { CoverSettingsProps } from '../types';

export const CoverSettings = ({ settings, updateArticle, updateAudiovisual }: CoverSettingsProps) => {
	return (
		<div>
			<CoverArticlesSection 
				settings={settings.articles}
				onUpdateArticle={updateArticle}
			/>
			<hr />
			<CoverAudiovisualSection
				settings={settings.audiovisual}
				onUpdateAudiovisual={updateAudiovisual}
			/>
		</div>
	);
};