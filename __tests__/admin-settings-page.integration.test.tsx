import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import { EditorialControlApp } from '../assets/js/settings/admin-settings-page';
import { STRINGS } from '../assets/js/settings/lib/i18n';
import { SettingsStore, useSettingsStore } from '../assets/js/settings/stores/settings';
import { CoverSlice } from '../assets/js/settings/stores/slices/cover';

// Mock the settings store - this is the main thing we need to mock for integration tests
jest.mock('../assets/js/settings/stores/settings');
const mockUseSettingsStore = useSettingsStore as jest.MockedFunction<typeof useSettingsStore>;

describe('EditorialControlApp Integration Tests', () => {
	const mockLoadSettings = jest.fn();
	const mockSaveSettings = jest.fn();

	const createMockStore = (): SettingsStore => {
		const coverSlice: CoverSlice = {
			updateAudiovisualField: jest.fn(),
			updateArticles: jest.fn(),
			validateField: jest.fn(),
		};

		return {
			settings: {
				cover: {
					audiovisual: { title: '', url: '', desc: '' },
					articles: {
						article_primary: [],
						article_secondary: [],
						article_tertiary: [],
					}
				}
			},
			originalSettings: {
				cover: {
					audiovisual: { title: '', url: '', desc: '' },
					articles: {
						article_primary: [],
						article_secondary: [],
						article_tertiary: [],
					}
				}
			},
			loading: false,
			saving: false,
			hasUnsavedChanges: false,
			validationErrors: [],

			// Methods
			loadSettings: mockLoadSettings,
			saveSettings: mockSaveSettings,
			resetSettings: jest.fn(),
			updateSetting: jest.fn(),
			validateStore: jest.fn(),
			getValidationError: jest.fn(),

			// Slice
			cover: coverSlice
		};
	};

	const createMockStoreState = (overrides: Partial<SettingsStore> = {}) => ({
		...createMockStore(),
		...overrides,
	});

	// Hook mock implementation
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseSettingsStore.mockImplementation((selector) => selector(createMockStore()));
	});

	describe('Initial loading and rendering', () => {
		it('renders loading spinner initially, then tabs after loadSettings completes', async () => {
			// Start with loading state
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({ loading: true });
				return selector(state);
			});

			const { rerender } = render(<EditorialControlApp />);

			// Should show loading state
			expect(screen.getByRole('progressbar')).toBeInTheDocument();
			expect(screen.getByText(STRINGS.LOADING)).toBeInTheDocument();
			expect(screen.queryByTestId('tabs')).not.toBeInTheDocument();

			// Verify loadSettings was called on mount
			expect(mockLoadSettings).toHaveBeenCalledTimes(1);

			// Simulate loading completion
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({ loading: false });
				return selector(state);
			});

			rerender(<EditorialControlApp />);

			// Should show main content
			expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
			expect(screen.getByTestId('tabs')).toBeInTheDocument();
			expect(screen.getByTestId('tab')).toHaveTextContent(STRINGS.COVER);

			// Should render the real components
			expect(screen.getByRole('button', { name: STRINGS.SAVE_CHANGES })).toBeInTheDocument();
		});
	});

	describe('Unsaved changes workflow', () => {
		it('editing a field sets hasUnsavedChanges=true', async () => {
			// Start with loaded state, no unsaved changes
			const { rerender } = render(<EditorialControlApp />);

			// Should not show unsaved indicator initially
			expect(screen.queryByText(STRINGS.UNSAVED_CHANGES)).not.toBeInTheDocument();
			expect(screen.getByRole('button', { name: STRINGS.SAVE_CHANGES })).toBeDisabled();

			// Simulate that editing a field has caused unsaved changes in the store
			// (The actual field editing would trigger store updates via the real modules)
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({ hasUnsavedChanges: true });
				return selector(state);
			});

			rerender(<EditorialControlApp />);

			// The app should now show unsaved changes
			expect(screen.getByText(STRINGS.UNSAVED_CHANGES)).toBeInTheDocument();
			expect(screen.getByRole('button', { name: STRINGS.SAVE_CHANGES })).not.toBeDisabled();
		});
	});

	describe('Save functionality', () => {
		it('clicking save calls saveSettings and shows saving state', async () => {
			mockSaveSettings.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

			// Start with unsaved changes
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({ hasUnsavedChanges: true, saving: false });
				return selector(state);
			});

			const { rerender } = render(<EditorialControlApp />);

			const saveBar = screen.getByTestId('save-settings-bar');

			const saveButton = within(saveBar).getByRole('button', { name: STRINGS.SAVE_CHANGES });
			expect(saveButton).not.toBeDisabled();

			// Click save
			fireEvent.click(saveButton);

			// Verify saveSettings was called
			expect(mockSaveSettings).toHaveBeenCalledTimes(1);

			// Simulate saving state
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({ hasUnsavedChanges: true, saving: true });
				return selector(state);
			});

			rerender(<EditorialControlApp />);

			// Should show saving state
			const savingButton = within(saveBar).getByRole('button', { name: STRINGS.SAVING });
			expect(savingButton).toBeDisabled();
		});

		it('successful save resets unsaved changes', async () => {
			mockSaveSettings.mockResolvedValueOnce(true); // SaveSettingsBar expects boolean return

			// Start with unsaved changes
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({ hasUnsavedChanges: true });
				return selector(state);
			});

			const { rerender } = render(<EditorialControlApp />);

			// Click save
			fireEvent.click(screen.getByRole('button', { name: STRINGS.SAVE_CHANGES }));

			// Wait for save to complete
			await waitFor(() => {
				expect(mockSaveSettings).toHaveBeenCalledTimes(1);
			});

			// Simulate successful save - no unsaved changes
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({ hasUnsavedChanges: false, saving: false });
				return selector(state);
			});

			rerender(<EditorialControlApp />);

			// Should reset unsaved changes
			expect(screen.queryByText(STRINGS.UNSAVED_CHANGES)).not.toBeInTheDocument();
			expect(screen.getByRole('button', { name: STRINGS.SAVE_CHANGES })).toBeDisabled();
		});
	});

	describe('Error handling', () => {
		it('disables save button when validation errors exist', async () => {
			const validationErrors = [
				{ field: 'cover.audiovisual.url', message: 'Invalid URL format' },
				{ field: 'cover.articles', message: 'At least one article is required' }
			];

			// Start with validation errors
			mockUseSettingsStore.mockImplementation((selector) => {
				const state = createMockStoreState({
					hasUnsavedChanges: true,
					validationErrors
				});
				return selector(state);
			});

			render(<EditorialControlApp />);
			
			const saveSettingsBar = screen.getByTestId('save-settings-bar');
			// Save button should be disabled due to validation errors
			const saveButton = within(saveSettingsBar).getByRole('button', { name: STRINGS.SAVE_CHANGES });
			expect(saveButton).toBeDisabled();

			// The validation errors should be visible in the component
			const urlErrorElements = within(saveSettingsBar).getByText('Invalid URL format');
			expect(urlErrorElements).toBeInTheDocument();
		});
	});
});