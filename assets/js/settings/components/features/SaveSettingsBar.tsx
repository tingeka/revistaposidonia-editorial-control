// assets/js/settings/components/SaveSettingsBar.tsx
import { Button, Snackbar } from '@wordpress/components';
import { useState } from '@wordpress/element';

import { STRINGS } from '../../lib/i18n';
import { useSettingsStore } from '../../stores/settings';

type SaveSettingsBarProps = {
  hasUnsavedChanges: boolean;
  saving: boolean;
  saveSettings: () => Promise<boolean>;
};

export const SaveSettingsBar = ({ hasUnsavedChanges, saving, saveSettings }: SaveSettingsBarProps) => {
  const [showSavedSnackbar, setShowSavedSnackbar] = useState(false);
  const validationErrors = useSettingsStore(state => state.validationErrors);

  const handleSave = async () => {
    const success = await saveSettings();
    if (success) {
      setShowSavedSnackbar(true);
      setTimeout(() => setShowSavedSnackbar(false), 3000);
    }
  };

  const hasErrors = validationErrors.length > 0;

  return (
    <div className="rp-ecs-save-container">
      {showSavedSnackbar && (
        <Snackbar onRemove={() => setShowSavedSnackbar(false)}>
          {STRINGS.SETTINGS_SAVED_SUCCESS}
        </Snackbar>
      )}

      <div className="rp-ecs-save-bar">
        <div className="rp-ecs-save-message">
          {hasErrors ? (
            validationErrors.map((err) => (
              <span key={err.field} className="rp-ecs-error">
                {err.message}
              </span>
            ))
          ) : (
            hasUnsavedChanges && (
              <span className="rp-ecs-unsaved">{STRINGS.UNSAVED_CHANGES}</span>
            )
          )}
        </div>

        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!hasUnsavedChanges || saving || hasErrors}
          isBusy={saving}
          className="rp-ecs-save-changes-button"
        >
          {saving ? STRINGS.SAVING : STRINGS.SAVE_CHANGES}
        </Button>
      </div>
    </div>
  );
};
