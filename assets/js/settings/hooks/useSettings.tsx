// js/settings/hooks/useSettings.tsx
import { useState, useEffect, useCallback } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

interface CoverSettings {
    articles?: Record<string, any>;
    audiovisual?: Record<string, any>;
}

interface Settings {
    cover?: CoverSettings;
    [key: string]: any;
}

declare global {
    interface Window {
        wpApiSettings: { nonce: string };
    }
}

export const useSettings = () => {
	const [settings, setSettings] = useState<Settings>({});
	const [originalSettings, setOriginalSettings] = useState<Settings>({});
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

	const updateSetting = useCallback((section, updates) => {
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
			const savedData = await response.json();
			
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

	// Convenience methods for specific updates
	const updateArticle = useCallback((articleType, items) => {
		const currentCover = settings.cover || {};
		updateSetting('cover', {
			...currentCover,
			articles: {
				...currentCover.articles,
				[articleType]: items,
			}
		});
	}, [settings.cover, updateSetting]);

	const updateAudiovisual = useCallback((field, value) => {
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
