import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { audio } from '@wordpress/icons';

import {
    CoverArticlesModule
} from '../../../assets/js/settings/components/modules/CoverArticlesModule';
import * as hooks from '../../../assets/js/settings/hooks/usePostWithEmbeds';
import { ARTICLE_TYPES } from '../../../assets/js/settings/lib/constants';
import { useSettingsStore } from '../../../assets/js/settings/stores/settings';
import {
    ArticleItem, CoverArticleConfig, CoverArticlesSettings
} from '../../../assets/js/settings/types';

jest.mock('../../assets/js/settings/hooks/usePostWithEmbeds');

describe('CoverArticlesModule + ArticlePicker', () => {
	const mockUsePostWithEmbeds = hooks.usePostWithEmbeds as jest.Mock;

	afterEach(() => {
		jest.clearAllMocks();
		act(() => {
			useSettingsStore.setState({
				loading: false,
				settings: {
					cover: {
						articles: {
							article_primary: [],
							article_secondary: [],
							article_tertiary: [],
						},
						audiovisual: { title: '', url: '', desc: '' },
					},
				},
			});
		});
	});

	describe('Happy paths', () => {

		it('selecting a fully embedded article renders complete preview', async () => {
			// 1. Prepare the article and store
			const article: ArticleItem = {
				id: 101,
				type: 'post',
				subtype: 'news',
				title: 'Test Article',
				url: 'https://example.com',
			};

			const articleConfig = ARTICLE_TYPES.find(t => t.key === 'article_primary')!;
			const articleType = articleConfig.key;
			const articleLabel = articleConfig.label;

			act(() => {
				useSettingsStore.getState().cover.updateArticles(articleType, [article]);
			});

			// 2. Mock hook return with full _embedded data
			const mockDate = '2025-09-10T12:34:56';
			mockUsePostWithEmbeds.mockReturnValue({
				post: {
					id: 101,
					title: { rendered: 'Test Article' },
					link: '/test',
					date: mockDate,
					_embedded: {
						author: [{ name: 'Jane Doe' }],
						'wp:featuredmedia': [{ source_url: 'https://example.com/image.jpg' }],
					},
				},
				isLoading: false,
			});

			// 3. Render
			render(<CoverArticlesModule />);

			// 4. Find preview
			const preview = await screen.findByLabelText(`${articleLabel} preview`);
			expect(preview).toBeInTheDocument();

			// 5. Check title link
			const link = within(preview).getByLabelText(`${articleLabel} preview link`);
			expect(link).toBeInTheDocument();
			expect(link).toHaveTextContent('Test Article');

			// 6. Check meta
			const meta = within(preview).getByLabelText(`${articleLabel} preview meta`);
			expect(meta).toBeInTheDocument();

			// 7. Check date inside meta
			const dateEl = within(meta).getByLabelText(`${articleLabel} preview date`);
			expect(dateEl).toBeInTheDocument();
			expect(dateEl.textContent).toBeTruthy();
			expect(!isNaN(Date.parse(dateEl.textContent!))).toBe(true);

			// 8. Check author
			expect(meta).toHaveTextContent('Jane Doe');
			screen.debug();
			// 9. Check image
			const imageContainer = within(preview).getByLabelText(`${articleLabel} preview image`) as HTMLImageElement;
			expect(imageContainer).toBeInTheDocument();
			expect(within(imageContainer).getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
		});

		it('switching between article types updates each preview independently', async () => {
			// 1. Prepare articles for primary and secondary
			const articles: CoverArticlesSettings = {
				article_primary: [
					{
						id: 101,
						type: 'post',
						subtype: 'news',
						title: 'Primary Article',
						url: 'https://example.com/primary',
					}
				],
				article_secondary: [
					{
						id: 102,
						type: 'post',
						subtype: 'news',
						title: 'Secondary Article',
						url: 'https://example.com/secondary',
					}
				],
				article_tertiary: [],
			};

			const primaryConfig = ARTICLE_TYPES.find(t => t.key === 'article_primary')!;
			const secondaryConfig = ARTICLE_TYPES.find(t => t.key === 'article_secondary')!;

			const primaryLabel = primaryConfig.label;
			const secondaryLabel = secondaryConfig.label;

			// 2. Mock hook to return full _embedded for both (before populating store)
			mockUsePostWithEmbeds.mockImplementation((postId: number) => {
				if (postId === 101) {
					return {
						post: {
							id: 101,
							title: { rendered: 'Primary Article' },
							link: '/primary',
							date: '2025-09-10T12:00:00',
							_embedded: {
								author: [{ name: 'Alice' }],
								'wp:featuredmedia': [{ source_url: 'https://example.com/image1.jpg' }],
							},
						},
						isLoading: false,
					};
				} else if (postId === 102) {
					return {
						post: {
							id: 102,
							title: { rendered: 'Secondary Article' },
							link: '/secondary',
							date: '2025-09-10T12:00:00',
							_embedded: {
								author: [{ name: 'Bob' }],
								'wp:featuredmedia': [{ source_url: 'https://example.com/image2.jpg' }],
							},
						},
						isLoading: false,
					};
				} else if (postId === 103) {
					return {
						post: {
							id: 103,
							title: { rendered: 'Updated Primary' },
							link: '/updated-primary',
							date: '2025-09-10T12:00:00',
							_embedded: {
								author: [{ name: 'Charlie' }],
								'wp:featuredmedia': [{ source_url: 'https://example.com/image3.jpg' }],
							},
						},
						isLoading: false,
					};
				}
				return { post: null, isLoading: false };
			});

			// 3. Populate store with both articles
			act(() => {
				useSettingsStore.getState().cover.updateArticles(primaryConfig.key, articles.article_primary);
				useSettingsStore.getState().cover.updateArticles(secondaryConfig.key, articles.article_secondary);
			});

			// 4. Render module
			render(<CoverArticlesModule />);

			// 5. Assert each preview renders independently
			const primaryPreview = await screen.findByLabelText(`${primaryLabel} preview`);
			const secondaryPreview = await screen.findByLabelText(`${secondaryLabel} preview`);

			expect(primaryPreview).toBeInTheDocument();
			expect(secondaryPreview).toBeInTheDocument();

			// 6. Check that titles and authors are correct
			expect(within(primaryPreview).getByLabelText(`${primaryLabel} preview link`)).toHaveTextContent('Primary Article');
			expect(within(primaryPreview).getByLabelText(`${primaryLabel} preview meta`)).toHaveTextContent('Alice');

			expect(within(secondaryPreview).getByLabelText(`${secondaryLabel} preview link`)).toHaveTextContent('Secondary Article');
			expect(within(secondaryPreview).getByLabelText(`${secondaryLabel} preview meta`)).toHaveTextContent('Bob');

			// 7. Simulate updating one article and ensure the other doesn't change
			const newPrimary: ArticleItem = {
				id: 103,
				type: 'post',
				subtype: 'news',
				title: 'Updated Primary',
				url: 'https://example.com/updated-primary',
			};

			act(() => {
				useSettingsStore.getState().cover.updateArticles(primaryConfig.key, [newPrimary]);
			});

			// 8. Wait for the updated primary preview to appear
			const updatedPrimaryPreview = await screen.findByLabelText(`${primaryLabel} preview`);
			expect(within(updatedPrimaryPreview).getByLabelText(`${primaryLabel} preview link`)).toHaveTextContent('Updated Primary');
			expect(within(updatedPrimaryPreview).getByLabelText(`${primaryLabel} preview meta`)).toHaveTextContent('Charlie');

			// 9. Secondary preview should remain unchanged
			const secondaryPreviewAfter = screen.getByLabelText(`${secondaryLabel} preview`);
			expect(within(secondaryPreviewAfter).getByLabelText(`${secondaryLabel} preview link`)).toHaveTextContent('Secondary Article');
			expect(within(secondaryPreviewAfter).getByLabelText(`${secondaryLabel} preview meta`)).toHaveTextContent('Bob');
		});

	});

	describe('Sad paths', () => {

		it('does not break store state when removing an article while another is loading', async () => {
			// 0. Safe default for the mocked hook
			mockUsePostWithEmbeds.mockReturnValue({ post: undefined, isLoading: false });

			// 1. Render the module
			render(<CoverArticlesModule />);

			// 2. Mock a selected article and add it to the store
			const article: ArticleItem = {
				id: 101,
				title: 'Test Article',
				url: 'https://example.com',
				type: 'post',
				subtype: 'post'
			};

			const articleConfig: CoverArticleConfig = ARTICLE_TYPES.find(t => t.key === 'article_primary')!;
			const articleType = articleConfig.key;
			const primaryLabel = articleConfig.label;

			act(() => {
				useSettingsStore.getState().cover.updateArticles(articleType, [article]);
			});

			// 3. Simulate another loading operation (e.g., fetching a new article)
			act(() => {
				useSettingsStore.setState({ loading: true });
			});

			// 4. Find and click the remove button for the selected article
			const removeButton = screen.getByLabelText('Eliminar'); // adjust if your label differs
			fireEvent.click(removeButton);

			// 5. Assert the selected article is removed
			const state = useSettingsStore.getState();
			expect(state.settings.cover.articles.article_primary).toEqual([]);

			// 6. Assert the loading state is unchanged
			expect(state.loading).toBe(true);

			// 7. Check that UI updates correctly (no crash, preview gone)
			const preview = await screen.queryByLabelText(`${primaryLabel} preview`);
			expect(preview).toBeNull();
		});

		it('selecting an article with missing `_embedded` data renders basic preview', async () => {
			// 1. Grab real store and populate it
			const article: ArticleItem = {
				id: 101,
				type: 'post',
				subtype: 'news',
				title: 'Test Article',
				url: 'https://example.com',
			};

			const articleConfig: CoverArticleConfig = ARTICLE_TYPES.find(t => t.key === 'article_primary')!;
			const articleType = articleConfig.key;
			const articleLabel = articleConfig.label;

			act(() => {
				useSettingsStore.getState().cover.updateArticles(articleType, [article]);
			});

			// 2. Mock hook return with missing _embedded data
			mockUsePostWithEmbeds.mockReturnValue({
				post: { id: 101, title: { rendered: 'Test Article' }, link: '/test' },
				isLoading: false,
			});

			// 3. Render the module
			render(<CoverArticlesModule />);

			// 4. Get the dynamic label for primary article type
			const preview = await screen.findByLabelText(`${articleLabel} preview`);

			// 5. Assert that the basic preview renders
			expect(preview).toBeInTheDocument();

			// 6. Assert title link exists, but no meta or image
			expect(within(preview).getByLabelText(`${articleLabel} preview link`)).toBeInTheDocument();
			expect(within(preview).queryByLabelText(`${articleLabel} preview meta`)).toBeNull();
			expect(within(preview).queryByLabelText(`${articleLabel} preview image`)).toBeNull();
		});

		it('handles null or empty API response gracefully', async () => {
			const article: ArticleItem = {
				id: 101,
				type: 'post',
				subtype: 'news',
				title: 'Test Article',
				url: 'https://example.com',
			};

			const articleConfig = ARTICLE_TYPES.find(t => t.key === 'article_primary')!;
			const articleType = articleConfig.key;
			const articleLabel = articleConfig.label;

			// 1. Populate store with selected article
			act(() => {
				useSettingsStore.getState().cover.updateArticles(articleType, [article]);
			});

			// 2. Mock hook returning null (API fails)
			mockUsePostWithEmbeds.mockReturnValue({
				post: null,
				isLoading: false,
			});

			// 3. Render module
			render(<CoverArticlesModule />);

			// 4. Preview should render safely (null post => no crash)
			const preview = await screen.queryByLabelText(`${articleLabel} preview`);
			expect(preview).toBeNull();

			// 5. Ensure store is unchanged
			const state = useSettingsStore.getState();
			expect(state.settings.cover.articles[articleType]).toHaveLength(1);
			expect(state.loading).toBe(false);
		});

	});

});
