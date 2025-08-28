// js/settings/components/EditorialControlSettings.tsx
import { useState } from '@wordpress/element';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { Button, Snackbar } from '@wordpress/components';
import { CoverSettings } from './CoverSettings';
import { useSettings } from '../hooks/useSettings';
import { STRINGS } from '../i18n';


export const EditorialControlSettings = () => {
	const {
		settings,
		loading,
		saving,
		hasUnsavedChanges,
		updateArticle,
		updateAudiovisual,
		saveSettings
	} = useSettings();

	const [showSavedSnackbar, setShowSavedSnackbar] = useState(false);
	const handleSave = async () => {
		const success = await saveSettings();
		if (success) {
			setShowSavedSnackbar(true);
			setTimeout(() => setShowSavedSnackbar(false), 3000); // Hide after 3 seconds
		}
	};

	if (loading) return <p>{STRINGS.LOADING}</p>;

	return (
		<div>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-end',
				gap: '0.5rem',
				position: 'fixed',
				bottom: '1rem',
				right: '1rem',
			}}>
				{showSavedSnackbar && (
					<Snackbar onRemove={() => setShowSavedSnackbar(false)}>
						{STRINGS.SETTINGS_SAVED_SUCCESS}
					</Snackbar>
				)}
				<div style={{
					display: 'flex',
					gap: '0.5rem',
					alignItems: 'center',
					backgroundColor: '#f1f1f1',
					padding: '0.5rem 1rem',
					fontSize: '1rem',
					borderRadius: '4px',
					width: 'min-content',
				}}>
					{hasUnsavedChanges && (
						<span style={{ fontSize: '0.875rem', color: '#d63638', textWrap: 'nowrap' }}>
							{STRINGS.UNSAVED_CHANGES}
						</span>
					)}

					<Button
						variant="primary"
						onClick={handleSave}
						disabled={!hasUnsavedChanges || saving}
						isBusy={saving}
						className='save-changes-button'
					>
						{saving ? STRINGS.SAVING : STRINGS.SAVE_CHANGES}
					</Button>
				</div>
			</div>

			<Tabs>
				<TabList>
					<Tab>{STRINGS.COVER}</Tab>
				</TabList>

				<TabPanel>
					<CoverSettings
						settings={settings.cover || {}}
						updateArticle={updateArticle}
						updateAudiovisual={updateAudiovisual}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
};