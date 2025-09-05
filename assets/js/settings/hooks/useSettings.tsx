// // js/settings/hooks/useSettings.tsx
import apiFetch from '@wordpress/api-fetch';
import { useCallback, useEffect, useState } from '@wordpress/element';

import { Settings } from '../types';

interface UseSettingsReturn {
	settings: Settings;
	loading: boolean;
	saving: boolean;
	hasUnsavedChanges: boolean;
	updateSetting: (section: keyof Settings, updates: any) => void;
	saveSettings: () => Promise<boolean>;
}

const DEFAULT_SETTINGS: Settings = {
  cover: {
    articles: {
      article_primary: [],
      article_secondary: [],
      article_tertiary: [],
    },
    audiovisual: {
      title: '',
      url: '',
      desc: '',
    },
  },
};

export const useSettings = (): UseSettingsReturn => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load settings
  useEffect(() => {
    apiFetch<Settings>({ path: '/revista-posidonia/v1/settings' })
      .then((data) => {
        setSettings(data);
        setOriginalSettings(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

  // Generic updater that merges with previous section
  const updateSetting = useCallback(
    <T extends keyof Settings>(section: T, updater: (prev: Settings[T]) => Settings[T]) => {
      setSettings((prev) => ({
        ...prev,
        [section]: updater(prev[section]),
      }));
    },
    []
  );

  const saveSettings = useCallback(async () => {
    setSaving(true);
    try {
      const savedData = await apiFetch<Settings>({
        path: '/revista-posidonia/v1/settings',
        method: 'PATCH',
        data: settings,
      });
      setSettings(savedData);
      setOriginalSettings(savedData);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setSaving(false);
    }
  }, [settings]);

  return { settings, loading, saving, hasUnsavedChanges, updateSetting, saveSettings };
};
