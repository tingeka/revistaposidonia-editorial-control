// assets/js/settings/admin-settings-page.tsx
import '../../css/settings/admin-settings-page.scss';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { ProgressBar } from '@wordpress/components';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import { SaveSettingsBar } from './components/features';
import { CoverPanel } from './components/panels';
import { useSettings, useSettingsUpdaters } from './hooks';
import { STRINGS } from './lib/i18n';

// Main React app component
const EditorialControlApp = () => {
  const { settings, loading, saving, hasUnsavedChanges, updateSetting, saveSettings } = useSettings();
  const { cover: coverUpdaters } = useSettingsUpdaters(updateSetting);
  
  if (loading) {
		return (
			<div className='rp-ecs-loading-container'>
				<ProgressBar className='rp-ecs-loading-bar' />
				<p className='rp-ecs-loading-text'>{STRINGS.LOADING}</p>
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
          <CoverPanel
            settings={settings.cover}
            updaters={coverUpdaters}
          />
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