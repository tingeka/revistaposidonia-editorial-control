// js/settings/hooks/useSettings.tsx
import { useState, useEffect, useCallback } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Settings, UseSettingsReturn, CoverArticleItem, CoverAudiovisualSettings, CoverArticleTypeKey, SettingsKey, SettingUpdates } from '../types';

// Default structure that matches backend contract
const DEFAULT_SETTINGS: Settings = {
	cover: {
		articles: {
			article_primary: [],
			article_secondary: [],
			article_tertiary: []
		},
		audiovisual: {
			title: '',
			url: '',
			desc: ''
		}
	}
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

	// Check if there are unsaved changes
	const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

	const updateSetting = useCallback((section: SettingsKey, updates: SettingUpdates) => {
		const updatedSettings = {
			...settings,
			[section]: { ...settings[section], ...updates }
		};
		setSettings(updatedSettings);
	}, [settings]);

	// Manual save function
	const saveSettings = useCallback(async () => {
		setSaving(true);
		try {
			const response = await fetch('/wp-json/revista-posidonia/v1/settings', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.wpApiSettings.nonce,
				},
				credentials: 'same-origin',
				body: JSON.stringify(settings),
			});

			if (!response.ok) throw new Error(await response.text());
			const savedData: Settings = await response.json();
			setSettings(savedData);
			setOriginalSettings(savedData);
			
			return true;
		} catch (err: unknown) {
			console.error(err);
			return false;
		} finally {
			setSaving(false);
		}
	}, [settings]);

	// Convenience methods for specific updates
	const updateArticle = useCallback((articleType: CoverArticleTypeKey, items: CoverArticleItem[]) => {
		const currentCover = settings.cover || {};
		updateSetting('cover', {
			...currentCover,
			articles: {
				...currentCover.articles,
				[articleType]: items,
			}
		});
	}, [settings.cover, updateSetting]);

	const updateAudiovisual = useCallback((field: keyof CoverAudiovisualSettings, value: string) => {
		const currentCover = settings.cover || {};
		updateSetting('cover', {
			...currentCover,
			audiovisual: {
				...currentCover.audiovisual,
				[field]: value,
			}
		});
	}, [settings.cover, updateSetting]);

	return { 
		settings, 
		loading, 
		saving, 
		hasUnsavedChanges,
		updateSetting, 
		updateArticle, 
		updateAudiovisual,
		saveSettings
	};
};