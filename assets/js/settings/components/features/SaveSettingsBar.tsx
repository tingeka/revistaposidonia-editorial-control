// js/settings/components/SaveSettingsBar.tsx

import { Button, Snackbar } from '@wordpress/components';
import { useState } from '@wordpress/element';

import { STRINGS } from '../i18n';

type SaveSettingsBarProps = {
	hasUnsavedChanges: boolean;
	saving: boolean;
	saveSettings: () => Promise<boolean>;
};

export const SaveSettingsBar = ({ hasUnsavedChanges, saving, saveSettings }: SaveSettingsBarProps) => {
	const [showSavedSnackbar, setShowSavedSnackbar] = useState(false);

	const handleSave = async () => {
		const success = await saveSettings();
		if (success) {
			setShowSavedSnackbar(true);
			setTimeout(() => setShowSavedSnackbar(false), 3000);
		}
	};

	return (
		<div className="rp-ecs-save-container">
			{showSavedSnackbar && (
				<Snackbar onRemove={() => setShowSavedSnackbar(false)}>
					{STRINGS.SETTINGS_SAVED_SUCCESS}
				</Snackbar>
			)}

			<div className="rp-ecs-save-bar">
				{hasUnsavedChanges && (
					<span className="rp-ecs-unsaved">{STRINGS.UNSAVED_CHANGES}</span>
				)}

				<Button
					variant="primary"
					onClick={handleSave}
					disabled={!hasUnsavedChanges || saving}
					isBusy={saving}
					className="rp-ecs-save-changes-button"
				>
					{saving ? STRINGS.SAVING : STRINGS.SAVE_CHANGES}
				</Button>
			</div>
		</div>
	);
};
