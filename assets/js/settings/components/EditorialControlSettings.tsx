// js/settings/components/EditorialControlSettings.tsx
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { useSettings, useSettingsUpdaters } from '../hooks';
import { STRINGS } from '../i18n';
import { SaveSettingsBar } from './features';
import { CoverPanel } from './panels';

export const EditorialControlSettings = () => {
  const { settings, loading, saving, hasUnsavedChanges, updateSetting, saveSettings } = useSettings();
  const { cover: coverUpdaters } = useSettingsUpdaters(updateSetting);
  console.log(settings);
  if (loading) return <p>{STRINGS.LOADING}</p>;

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
