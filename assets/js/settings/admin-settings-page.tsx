// assets/js/settings/admin-settings-page.tsx
import '../../css/settings/admin-settings-page.scss';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { ProgressBar } from '@wordpress/components';
import domReady from '@wordpress/dom-ready';
import { createRoot, useEffect } from '@wordpress/element';

import { SaveSettingsBar } from './components/features';
import { CoverPanel } from './components/panels';
import { STRINGS } from './lib/i18n';
import { useSettingsStore } from './stores/settings';

// Main React app
const EditorialControlApp = () => {
  // Zustand selectors
  const loading = useSettingsStore((state) => state.loading);
  const saving = useSettingsStore((state) => state.saving);
  const hasUnsavedChanges = useSettingsStore((state) => state.hasUnsavedChanges);
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  const saveSettings = useSettingsStore((state) => state.saveSettings);

  // Fetch settings once on mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  if (loading) {
    return (
      <div className="rp-ecs-loading-container">
        <ProgressBar className="rp-ecs-loading-bar" />
        <p className="rp-ecs-loading-text">{STRINGS.LOADING}</p>
      </div>
    );
  }

  return (
    <div className="rp-ecs-container">
      <Tabs>
        <TabList>
          <Tab>{STRINGS.COVER}</Tab>
        </TabList>
        <TabPanel>
          <CoverPanel />
        </TabPanel>
      </Tabs>

      <SaveSettingsBar
        hasUnsavedChanges={hasUnsavedChanges}
        saving={saving}
        saveSettings={saveSettings}
      />
    </div>
  );
};

// DOM setup
domReady(() => {
  const rootEl = document.getElementById('editorial-control-page');
  if (!rootEl) return;

  const root = createRoot(rootEl);
  root.render(<EditorialControlApp />);
});